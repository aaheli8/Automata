package dev.automata.automata.repository;


import dev.automata.automata.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {

    Optional<UserEntity> findUserEntityByEmail(String  email);
}
