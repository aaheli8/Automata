package dev.automata.automata.entity;

import lombok.Builder;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Document
@Builder
public class UserEntity {
    @Id
    private String id;
    private String firstName;
    private String lastName;

    @Indexed(unique = true)
    private String email;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoggedIn;
}
