package dev.automata.automata.service;

import dev.automata.automata.entity.UserEntity;
import dev.automata.automata.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
}
