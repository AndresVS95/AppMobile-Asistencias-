package com.example.asistencia.service;

import com.example.asistencia.model.Profesor;
import com.example.asistencia.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfesorService {

  @Autowired
  private ProfesorRepository profesorRepository;

  // Método original — lo dejamos para no romper nada
  public boolean login(String nombreUsuario, String contrasena) {
    Optional<Profesor> profesorOpt = profesorRepository.findByNombreUsuario(nombreUsuario);
    if (profesorOpt.isPresent()) {
      Profesor profesor = profesorOpt.get();
      return profesor.getContrasena().equals(contrasena);
    }
    return false;
  }

  // Método nuevo — devuelve el Profesor completo para la app mobile
  public Optional<Profesor> autenticar(String nombreUsuario, String contrasena) {
    Optional<Profesor> profesorOpt = profesorRepository.findByNombreUsuario(nombreUsuario);
    if (profesorOpt.isPresent()) {
      Profesor profesor = profesorOpt.get();
      if (profesor.getContrasena().equals(contrasena)) {
        return Optional.of(profesor);
      }
    }
    return Optional.empty();
  }
}