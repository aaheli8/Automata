package dev.automata.automata.model;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
}
