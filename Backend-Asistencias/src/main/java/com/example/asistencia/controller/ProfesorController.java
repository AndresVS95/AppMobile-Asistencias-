package com.example.asistencia.controller;

import com.example.asistencia.dto.LoginDTO;
import com.example.asistencia.model.Profesor;
import com.example.asistencia.service.JwtService;
import com.example.asistencia.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = {
        "http://localhost:3003",
        "https://ele5-3.apolobyte.top",
        "http://localhost:3008",
        "http://localhost:8081",   // Expo web
        "http://localhost:19006"   // Expo DevTools
})
public class ProfesorController {

  @Autowired
  private ProfesorService profesorService;

  @Autowired
  private JwtService jwtService;

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO) {

    Optional<Profesor> profesorOpt = profesorService.autenticar(
            loginDTO.getNombreUsuario(),
            loginDTO.getContrasena()
    );

    if (profesorOpt.isPresent()) {
      Profesor profesor = profesorOpt.get();
      String token = jwtService.generarToken(profesor.getNombre_Usuario());

      // Datos del profesor sin la contraseña
      Map<String, Object> datosProfesor = new HashMap<>();
      datosProfesor.put("id_profesor",    profesor.getIdProfesor());
      datosProfesor.put("nombre",         profesor.getNombre());
      datosProfesor.put("nombre_usuario", profesor.getNombre_Usuario());
      datosProfesor.put("cedula",         profesor.getCedula());

      Map<String, Object> respuesta = new HashMap<>();
      respuesta.put("token",    token);
      respuesta.put("profesor", datosProfesor);

      return ResponseEntity.ok(respuesta);

    } else {
      Map<String, Object> error = new HashMap<>();
      error.put("mensaje", "Credenciales inválidas");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
  }
}