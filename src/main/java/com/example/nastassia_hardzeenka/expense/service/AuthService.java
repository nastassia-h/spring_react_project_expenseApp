package com.example.nastassia_hardzeenka.expense.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.nastassia_hardzeenka.expense.exception.AppError;
import com.example.nastassia_hardzeenka.expense.model.JwtRequest;
import com.example.nastassia_hardzeenka.expense.model.JwtResponse;
import com.example.nastassia_hardzeenka.expense.model.RegistrationUser;
import com.example.nastassia_hardzeenka.expense.model.User;
import com.example.nastassia_hardzeenka.expense.utils.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
   @Autowired
   private CustomUserDetailsService userService;
   @Autowired
   private JwtTokenUtil jwtTokenUtils;
   @Autowired
   private AuthenticationManager authenticationManager;

   public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
      try {
         authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
      } catch (Exception e) {
         return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.value(),
               "Invalid login or password"),
               HttpStatus.UNAUTHORIZED);
      }
      UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());
      String token = jwtTokenUtils.createToken(userDetails);
      return ResponseEntity.ok(new JwtResponse(userDetails.getUsername(), token));
   }

   public ResponseEntity<?> createNewUser(@RequestBody RegistrationUser registrationUser) {
      if (!registrationUser.getPassword().equals(registrationUser.getConfirmPassword())) {
         return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(),
               "Passwords don't match"),
               HttpStatus.BAD_REQUEST);
      }
      if (userService.loadUserByUsername(registrationUser.getUsername()) != null) {
         return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(),
               "User has been already existed"),
               HttpStatus.BAD_REQUEST);
      }
      User user = userService.createNewUser(registrationUser);
      return ResponseEntity.ok(user);
   }
}
