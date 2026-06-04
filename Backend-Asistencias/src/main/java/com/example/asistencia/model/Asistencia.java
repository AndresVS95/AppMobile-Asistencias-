package com.example.asistencia.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "asistencias")
public class Asistencia {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idAsistencia;

  private LocalDate fecha;

  @Enumerated(EnumType.STRING)
  private EstadoAsistencia estado;

  public void setEstado(EstadoAsistencia estado) {
    this.estado = estado;
  }

  // Relación: La asistencia pertenece a una clase específica
  @ManyToOne
  @JoinColumn(name = "id_clase")
  private Clases clase;

  // Relación: La asistencia pertenece a un estudiante específico
  @ManyToOne
  @JoinColumn(name = "id_estudiante")
  private Estudiante estudiante;

  public Long getIdAsistencia() {
    return idAsistencia;
  }

  public void setIdAsistencia(Long idAsistencia) {
    this.idAsistencia = idAsistencia;
  }

  public LocalDate getFecha() {
    return fecha;
  }

  public Clases getClase() {
    return clase;
  }

  public void setClase(Clases clase) {
    this.clase = clase;
  }

  public void setFecha(LocalDate fecha) {
    this.fecha = fecha;
  }

  public EstadoAsistencia getEstado() {
    return estado;
  }

  public Estudiante getEstudiante() {
    return estudiante;
  }

  public void setEstudiante(Estudiante estudiante) {
    this.estudiante = estudiante;
  }
}
