package com.example.nastassia_hardzeenka.expense.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "category")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "subtitle")
	private String subtitle;

	@Column(name = "categoryPicturePath")
	private String categoryPicturePath;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	private Collection<Expense> expenses;

}
