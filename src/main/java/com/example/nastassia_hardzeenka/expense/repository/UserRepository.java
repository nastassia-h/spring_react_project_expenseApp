package com.example.nastassia_hardzeenka.expense.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.nastassia_hardzeenka.expense.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
   User findByUsername(String username);
}
