package pl.karol.horyzont.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import pl.karol.horyzont.models.User;

public interface UserRepository extends MongoRepository<User, String>, CustomUserRepository{
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  Optional<User> findById(String id);
}
