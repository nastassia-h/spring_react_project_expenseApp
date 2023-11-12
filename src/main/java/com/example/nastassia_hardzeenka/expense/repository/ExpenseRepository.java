package com.example.nastassia_hardzeenka.expense.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nastassia_hardzeenka.expense.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
   List<Expense> findByUserIdOrderByDateDesc(Long userId);
}
