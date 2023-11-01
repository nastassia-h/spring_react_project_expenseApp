package com.example.nastassia_hardzeenka.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nastassia_hardzeenka.expense.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	Category findByName(String name);
}
