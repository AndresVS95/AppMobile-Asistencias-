package com.example.asistencia.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "profesores")
public class Profesor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idProfesor;

  private String nombre;
  private String cedula;
  private String nombre_Usuario; // Corregido el error tipográfico de tu diagrama
  private String contrasena;

  // Relación: Un profesor puede tener muchas clases
  @JsonIgnore
  @OneToMany(mappedBy = "profesor")
  private List<Clases> clases;

  public Long getIdProfesor() {
    return idProfesor;
  }

  public void setIdProfesor(Long idProfesor) {
    this.idProfesor = idProfesor;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getCedula() {
    return cedula;
  }

  public void setCedula(String cedula) {
    this.cedula = cedula;
  }

  public String getNombre_Usuario() {
    return nombre_Usuario;
  }

  public void setNombre_Usuario(String nombre_Usuario) {
    this.nombre_Usuario = nombre_Usuario;
  }

  public String getContrasena() {
    return contrasena;
  }

  public void setContrasena(String contrasena) {
    this.contrasena = contrasena;
  }

  public List<Clases> getClases() {
    return clases;
  }

  public void setClases(List<Clases> clases) {
    this.clases = clases;
  }

}
