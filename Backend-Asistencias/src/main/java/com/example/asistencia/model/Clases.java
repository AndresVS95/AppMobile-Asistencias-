package com.example.asistencia.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "clases")
public class Clases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_clase")
    private Long idClase;

    @Column(name = "nombre_clase")
    private String nombre;

    // Relación: Muchas clases pertenecen a Un profesor
    @ManyToOne
    @JoinColumn(name = "id_profesor")
    private Profesor profesor;

    // Relación Muchos a Muchos con Estudiante
    @ManyToMany
    @JoinTable(
            name = "clase_estudiante",
            joinColumns = @JoinColumn(name = "id_clase"),
            inverseJoinColumns = @JoinColumn(name = "id_estudiante")
    )
    private List<Estudiante> estudiantes;

    // --- GETTERS Y SETTERS ---
    public Long getIdClase() { return idClase; }
    public void setIdClase(Long idClase) { this.idClase = idClase; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Profesor getProfesor() { return profesor; }
    public void setProfesor(Profesor profesor) { this.profesor = profesor; }

    public List<Estudiante> getEstudiantes() { return estudiantes; }
    public void setEstudiantes(List<Estudiante> estudiantes) { this.estudiantes = estudiantes; }
}