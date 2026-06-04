package com.example.asistencia.service;

import com.example.asistencia.model.Asistencia;
import com.example.asistencia.model.Clases;
import com.example.asistencia.model.Estudiante;
import com.example.asistencia.repository.AsistenciaRepository;
import com.example.asistencia.repository.ClasesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AsistenciaService {

  @Autowired
  private AsistenciaRepository asistenciaRepository;

  @Autowired
  private ClasesRepository claseRepository;

  // Guardar una lista entera de asistencias enviada por el profesor
  public List<Asistencia> guardarAsistencias(List<Asistencia> asistencias) {
    return asistenciaRepository.saveAll(asistencias);
  }

  // Reporte 1: Ver quién asistió a una clase en una fecha específica
  public List<Asistencia> reportePorClaseYFecha(Long idClase, LocalDate fecha) {
    // Buscamos la clase primero
    Clases clase = claseRepository.findById(idClase)
      .orElseThrow(() -> new RuntimeException("Clase no encontrada"));

    return asistenciaRepository.findByClaseAndFecha(clase, fecha);
  }

  // Reporte 2: Ver el historial completo de un estudiante
  public List<Asistencia> reportePorEstudiante(Estudiante estudiante) {
    return asistenciaRepository.findByEstudiante(estudiante);
  }
}
