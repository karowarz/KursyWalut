package pl.karol.horyzont.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import pl.karol.horyzont.models.ERole;
import pl.karol.horyzont.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
