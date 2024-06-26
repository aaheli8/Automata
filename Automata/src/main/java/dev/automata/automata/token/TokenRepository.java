package dev.automata.automata.token;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import java.util.List;
import java.util.Optional;

public interface TokenRepository extends ReactiveMongoRepository<Token, String> {

//    @Query(value = """
//      select t from Token t inner join FEUser u
//      on t.userId.pkId = u.pkId
//      where u.pkId = id and (t.expired = false or t.revoked = false)
//      """)
    List<Token> findAllValidTokenByUserId_Id(String id);

    Optional<Token> findByToken(String token);
}
