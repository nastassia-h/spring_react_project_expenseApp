package com.example.nastassia_hardzeenka.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nastassia_hardzeenka.expense.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
