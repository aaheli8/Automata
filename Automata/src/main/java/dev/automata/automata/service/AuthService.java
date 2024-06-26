package dev.automata.automata.service;

import dev.automata.automata.entity.Role;
import dev.automata.automata.entity.UserEntity;
import dev.automata.automata.model.AuthenticationRequest;
import dev.automata.automata.model.AuthenticationResponse;
import dev.automata.automata.model.RegisterRequest;
import dev.automata.automata.repository.UserRepository;
import dev.automata.automata.security.JwtService;
import dev.automata.automata.token.Token;
import dev.automata.automata.token.TokenRepository;
import dev.automata.automata.token.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenRepository tokenRepository;
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public UserEntity getUser(String email) {
        return repository.findUserEntityByEmail(email).block();
    }
    public AuthenticationResponse register(RegisterRequest request) {
        String email = request.getEmail();
        var alreadyUser = getUser(email);
        if (alreadyUser != null) {
            return AuthenticationResponse.builder().msg("User already exists").build();
        } else {
            var user = UserEntity.builder()
                    .username(request.getUsername())
                    .email(email)
                    .createdAt(System.currentTimeMillis())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER.toString())
                    .build();
            repository.save(user).block();


            var token = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            saveUserToken(user, token);
            return AuthenticationResponse.builder()
                    .accessToken(token)
                    .refreshToken(refreshToken)
                    .createdAt(user.getCreatedAt())
                    .email(user.getEmail())
                    .username(user.getUsername())
                    .userId(user.getId())
                    .build();
        }
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );
        var user = repository.findUserEntityByEmail(request.getEmail()).block();
        var token = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, token);
        return AuthenticationResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .createdAt(user.getCreatedAt())
                .email(user.getEmail())
                .username(user.getUsername())
                .userId(user.getId())
                .build();
    }

    public AuthenticationResponse refreshToken(
            HttpServletRequest request
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.repository.findUserEntityByEmail(userEmail)
                    .block();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                return AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .createdAt(user.getCreatedAt())
                        .email(user.getEmail())
                        .username(user.getUsername())
                        .userId(user.getId())
                        .build();
            }
        }
        return null;
    }

    private void saveUserToken(UserEntity user, String jwtToken) {
        try {
            var token = Token.builder()
                    .userId(user)
                    .token(jwtToken)
                    .tokenType(TokenType.BEARER)
                    .expired(false)
                    .revoked(false)
                    .build();
            tokenRepository.save(token).block();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void revokeAllUserTokens(UserEntity user) {
        try {
            var validUserTokens = tokenRepository.findAllValidTokenByUserId_Id(user.getId());
            if (validUserTokens.isEmpty())
                return;
            validUserTokens.forEach(token -> {
                token.setExpired(true);
                token.setRevoked(true);
            });
            tokenRepository.saveAll(validUserTokens).blockFirst();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
