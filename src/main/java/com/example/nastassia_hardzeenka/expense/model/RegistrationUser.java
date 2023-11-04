package com.example.nastassia_hardzeenka.expense.model;

import lombok.Data;

@Data
public class RegistrationUser {
   private String firstname;
   private String lastname;
   private String username;
   private String location;
   private String occupation;
   private String password;
   private String confirmPassword;
   private String email;
}
