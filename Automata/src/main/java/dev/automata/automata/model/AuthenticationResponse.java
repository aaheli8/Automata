package dev.automata.automata.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    String accessToken;
    String refreshToken;
    String username;
    String email;
    String userId;
    Long expiresIn;
    Long createdAt;
    String msg;
}
