package com.example.asistencia.service;

import com.example.asistencia.model.Estudiante;
import com.example.asistencia.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

  @Autowired
  private EstudianteRepository estudianteRepository;

  // Crear o Actualizar (C y U del CRUD)
  public Estudiante guardarEstudiante(Estudiante estudiante) {
    return estudianteRepository.save(estudiante);
  }

  // Leer todos (R del CRUD)
  public List<Estudiante> obtenerTodos() {
    return estudianteRepository.findAll();
  }

  // Leer uno solo por ID
  public Optional<Estudiante> obtenerPorId(Long id) {
    return estudianteRepository.findById(id);
  }

  // Eliminar (D del CRUD)
  public void eliminarEstudiante(Long id) {
    estudianteRepository.deleteById(id);
  }
}
