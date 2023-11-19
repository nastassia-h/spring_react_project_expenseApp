package com.example.nastassia_hardzeenka.expense.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.nastassia_hardzeenka.expense.model.RegistrationUser;
import com.example.nastassia_hardzeenka.expense.model.User;
import com.example.nastassia_hardzeenka.expense.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

   @Autowired
   private UserRepository userRepository;
   @Autowired
   ServletContext context;
   private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

   @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      User user = userRepository.findByUsername(username);
      if (user == null) {
         return null;
      }
      List<String> roles = new ArrayList<>();
      roles.add("USER");
      UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .roles(roles.toArray(new String[0]))
            .build();
      return userDetails;
   }

   public User createNewUser(RegistrationUser registrationUser) {
      User user = new User();
      user.setFirstname(registrationUser.getFirstname());
      user.setLastname(registrationUser.getLastname());
      user.setUsername(registrationUser.getUsername());
      user.setEmail(registrationUser.getEmail());
      user.setLocation(registrationUser.getLocation());
      user.setOccupation(registrationUser.getOccupation());
      user.setPassword(passwordEncoder.encode(registrationUser.getPassword()));
      return userRepository.save(user);
   }

   public User updateUser(User user) {
      User currentUser = userRepository.findByUsername(user.getUsername());
      currentUser.setFirstname(user.getFirstname());
      currentUser.setLastname(user.getLastname());
      currentUser.setUsername(user.getUsername());
      currentUser.setLocation(user.getLocation());
      currentUser.setOccupation(user.getOccupation());
      currentUser.setEmail(user.getEmail());
      return userRepository.save(currentUser);
   }
}
