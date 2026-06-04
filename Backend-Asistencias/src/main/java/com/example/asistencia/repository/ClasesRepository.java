package com.example.asistencia.repository;

import com.example.asistencia.model.Clases;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClasesRepository extends JpaRepository<Clases, Long> {

    // Filtra las clases por el id del profesor
    List<Clases> findByProfesor_IdProfesor(Long idProfesor);
}