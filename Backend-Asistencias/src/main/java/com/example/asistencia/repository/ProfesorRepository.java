package com.example.asistencia.repository;

import com.example.asistencia.model.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

  // Le decimos a Spring EXACTAMENTE qué consulta SQL (HQL) hacer,
  // para que no intente adivinar por el nombre del método.
  @Query("SELECT p FROM Profesor p WHERE p.nombre_Usuario = ?1")
  Optional<Profesor> findByNombreUsuario(String nombreUsuario);

}