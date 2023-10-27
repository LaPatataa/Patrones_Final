package com.tutorial.crud.security.service;

import com.tutorial.crud.security.entity.Estudiante;
import com.tutorial.crud.security.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    public void guardarEstudiante(Estudiante estudiante) {
        estudianteRepository.save(estudiante);
    }
}
