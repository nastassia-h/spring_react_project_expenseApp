package com.example.nastassia_hardzeenka.expense.exception;

import java.util.Date;

import lombok.Data;

@Data
public class AppError {
   private int status;
   private String message;
   private Date timestamp;

   public AppError(int status, String message) {
      this.status = status;
      this.message = message;
      this.timestamp = new Date();
   }
}
