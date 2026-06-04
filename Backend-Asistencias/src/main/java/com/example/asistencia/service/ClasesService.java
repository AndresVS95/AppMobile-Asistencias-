package com.example.asistencia.service;

import com.example.asistencia.model.Clases;
import com.example.asistencia.model.Estudiante;
import com.example.asistencia.repository.ClasesRepository;
import com.example.asistencia.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClasesService {

    @Autowired
    private ClasesRepository clasesRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    public List<Clases> obtenerTodas() {
        return clasesRepository.findAll();
    }

    // Método nuevo — filtra por profesor
    public List<Clases> obtenerPorProfesor(Long idProfesor) {
        return clasesRepository.findByProfesor_IdProfesor(idProfesor);
    }

    public Clases obtenerPorId(Long id) {
        return clasesRepository.findById(id).orElse(null);
    }

    public Clases guardarClase(Clases clase) {
        return clasesRepository.save(clase);
    }

    public Clases matricularEstudiante(Long idClase, Long idEstudiante) {
        Optional<Clases> claseOpt = clasesRepository.findById(idClase);
        Optional<Estudiante> estOpt = estudianteRepository.findById(idEstudiante);

        if (claseOpt.isPresent() && estOpt.isPresent()) {
            Clases clase = claseOpt.get();
            Estudiante estudiante = estOpt.get();
            if (!clase.getEstudiantes().contains(estudiante)) {
                clase.getEstudiantes().add(estudiante);
                return clasesRepository.save(clase);
            }
            return clase;
        }
        throw new RuntimeException("No se encontró la clase o el estudiante");
    }
}