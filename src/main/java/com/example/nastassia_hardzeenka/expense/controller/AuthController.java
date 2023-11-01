package com.example.nastassia_hardzeenka.expense.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.nastassia_hardzeenka.expense.model.JwtRequest;
import com.example.nastassia_hardzeenka.expense.model.RegistrationUser;
import com.example.nastassia_hardzeenka.expense.service.AuthService;

@RestController
@RequestMapping("rest/api")
public class AuthController {
   @Autowired
   private AuthService authService;

   @ResponseBody
   @RequestMapping(value = "/login", method = RequestMethod.POST)
   public ResponseEntity login(@RequestBody JwtRequest jwtRequest) {
      return authService.createAuthToken(jwtRequest);
   }

   @ResponseBody
   @RequestMapping(value = "/registration", method = RequestMethod.POST)
   public ResponseEntity registration(@RequestBody RegistrationUser user) {
      return authService.createNewUser(user);
   }
}
