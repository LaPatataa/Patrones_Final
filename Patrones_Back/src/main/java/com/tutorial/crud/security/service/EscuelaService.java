package com.tutorial.crud.security.service;

import com.tutorial.crud.security.entity.Escuela;
import com.tutorial.crud.security.repository.EscuelaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EscuelaService {

    @Autowired
    private EscuelaRepository escuelaRepository;

    public void guardarEscuela(Escuela escuela) {
        // Puedes agregar validaciones y lógica adicional aquí antes de guardar la escuela
        escuelaRepository.save(escuela);
    }

    public List<Escuela> obtenerTodasLasEscuelas() {
        return escuelaRepository.findAll();
    }

    public Escuela obtenerEscuelaPorId(Long id) {
        return escuelaRepository.findById(id).orElse(null);
    }
    public Escuela obtenerEscuelaPorNombre(String nombre) {
        return escuelaRepository.findByNombre(nombre);
    }

    // Puedes agregar otros métodos relacionados con las escuelas según tus necesidades
}

