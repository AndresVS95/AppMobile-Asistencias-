package com.example.asistencia.controller;

import com.example.asistencia.model.Clases;
import com.example.asistencia.model.Profesor;
import com.example.asistencia.service.ClasesService;
import com.example.asistencia.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clases")
@CrossOrigin(origins = {
        "http://localhost:3003",
        "https://ele5-3.apolobyte.top",
        "http://localhost:3008",
        "http://localhost:8081",
        "http://localhost:19006"
})
public class ClasesController {

    @Autowired
    private ClasesService clasesService;

    @Autowired
    private ProfesorRepository profesorRepository;

    // GET /api/clases?idProfesor=1  ← filtra por profesor
    // GET /api/clases               ← devuelve todas (compatibilidad web)
    @GetMapping
    public List<Clases> listarClases(@RequestParam(required = false) Long idProfesor) {
        if (idProfesor != null) {
            return clasesService.obtenerPorProfesor(idProfesor);
        }
        return clasesService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Clases obtenerClase(@PathVariable Long id) {
        return clasesService.obtenerPorId(id);
    }

    // Recibe { "nombre": "...", "idProfesor": 1 }
    @PostMapping
    public ResponseEntity<?> crearClase(@RequestBody ClaseRequest request) {
        Optional<Profesor> profesorOpt = profesorRepository.findById(request.getIdProfesor());
        if (profesorOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Profesor no encontrado");
        }
        Clases clase = new Clases();
        clase.setNombre(request.getNombre());
        clase.setProfesor(profesorOpt.get());

        return ResponseEntity.ok(clasesService.guardarClase(clase));
    }

    @PostMapping("/{idClase}/estudiantes/{idEstudiante}")
    public Clases matricular(@PathVariable Long idClase, @PathVariable Long idEstudiante) {
        return clasesService.matricularEstudiante(idClase, idEstudiante);
    }

    // DTO interno para crear clase
    static class ClaseRequest {
        private String nombre;
        private Long idProfesor;

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public Long getIdProfesor() { return idProfesor; }
        public void setIdProfesor(Long idProfesor) { this.idProfesor = idProfesor; }
    }
}