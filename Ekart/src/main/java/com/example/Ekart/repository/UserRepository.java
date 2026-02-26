package com.example.Ekart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Ekart.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}