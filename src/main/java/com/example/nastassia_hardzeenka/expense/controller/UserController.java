package com.example.nastassia_hardzeenka.expense.controller;

import java.util.Map;
import java.util.Optional;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.nastassia_hardzeenka.expense.exception.AppError;
import com.example.nastassia_hardzeenka.expense.model.User;
import com.example.nastassia_hardzeenka.expense.repository.UserRepository;
import com.example.nastassia_hardzeenka.expense.service.CustomUserDetailsService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "user", produces = "application/json")
public class UserController {
   @Autowired
   private UserRepository userRepository;
   @Autowired
   private CustomUserDetailsService userService;

   @GetMapping("/{id}")
   public ResponseEntity<?> getUser(@PathVariable String id) {
      Optional<User> user = userRepository.findById(Long.parseLong(id));
      return ResponseEntity.ok(Map.of("user", user));
   }

   @PutMapping("/{id}")
   public ResponseEntity<?> updateUser(@RequestBody User user) {
      User result = userService.updateUser(user);
      return ResponseEntity.ok().body(result);
   }
}
