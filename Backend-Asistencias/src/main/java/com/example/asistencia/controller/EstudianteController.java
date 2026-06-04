package com.example.asistencia.controller;

import com.example.asistencia.model.Estudiante;
import com.example.asistencia.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = {"http://localhost:3003", "https://ele5-3.apolobyte.top", "http://localhost:3008"})
public class EstudianteController {

  @Autowired
  private EstudianteService estudianteService;

  // Obtener todos los estudiantes (GET http://localhost:8080/api/estudiantes)
  @GetMapping
  public List<Estudiante> listarTodos() {
    return estudianteService.obtenerTodos();
  }

  // Obtener un estudiante por ID
  @GetMapping("/{id}")
  public ResponseEntity<Estudiante> obtenerPorId(@PathVariable Long id) {
    Optional<Estudiante> estudiante = estudianteService.obtenerPorId(id);
    return estudiante.map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.notFound().build());
  }

  // Crear un nuevo estudiante (POST http://localhost:8080/api/estudiantes)
  @PostMapping
  public Estudiante guardar(@RequestBody Estudiante estudiante) {
    return estudianteService.guardarEstudiante(estudiante);
  }

  // Eliminar un estudiante (DELETE http://localhost:8080/api/estudiantes/1)
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminar(@PathVariable Long id) {
    estudianteService.eliminarEstudiante(id);
    return ResponseEntity.ok().build();
  }
}
