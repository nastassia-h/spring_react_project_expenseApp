package com.example.nastassia_hardzeenka.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.nastassia_hardzeenka.expense.model.Category;
import com.example.nastassia_hardzeenka.expense.model.Expense;
import com.example.nastassia_hardzeenka.expense.model.User;
import com.example.nastassia_hardzeenka.expense.repository.ExpenseRepository;
import com.example.nastassia_hardzeenka.expense.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("expenses")
public class ExpenseController {

	@Autowired
	private ExpenseRepository expenseRepository;

	@GetMapping("")
	List<Expense> getExpenses(@RequestParam Long userId) {
		return expenseRepository.findByUserIdOrderByDateDesc(userId);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<?> deleteExpense(@PathVariable Long id) {
		expenseRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("")
	ResponseEntity<Expense> createExpense(@RequestBody Expense expense) throws URISyntaxException {
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.ok().body(result);
	}
}
