package com.example.asistencia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "estudiantes")
public class Estudiante {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idEstudiante;

  private String nombreEstudiante;
  private String codigo;

  // Relación: Un estudiante puede estar en muchas clases
  @ManyToMany(mappedBy = "estudiantes")
  @JsonIgnore // Evita un bucle infinito al enviar los datos a React
  private List<Clases> clases;

  public Long getIdEstudiante() {
    return idEstudiante;
  }

  public String getNombreEstudiante() {
    return nombreEstudiante;
  }

  public void setNombreEstudiante(String nombreEstudiante) {
    this.nombreEstudiante = nombreEstudiante;
  }

  public String getCodigo() {
    return codigo;
  }

  public List<Clases> getClases() {
    return clases;
  }

  public void setClases(List<Clases> clases) {
    this.clases = clases;
  }

  public void setCodigo(String codigo) {
    this.codigo = codigo;
  }

  public void setIdEstudiante(Long idEstudiante) {
    this.idEstudiante = idEstudiante;
  }
}
