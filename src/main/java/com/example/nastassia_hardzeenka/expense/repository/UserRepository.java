package com.example.nastassia_hardzeenka.expense.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.nastassia_hardzeenka.expense.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
   User findByUsername(String username);

   Optional<User> findById(Long id);
}
