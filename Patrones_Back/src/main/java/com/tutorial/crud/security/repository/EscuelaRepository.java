package com.tutorial.crud.security.repository;

import com.tutorial.crud.security.entity.Escuela;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EscuelaRepository extends JpaRepository<Escuela, Long> {
    Escuela findByNombre(String nombre);
}