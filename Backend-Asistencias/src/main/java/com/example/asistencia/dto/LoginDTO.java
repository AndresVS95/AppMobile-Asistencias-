package com.example.asistencia.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginDTO {

  // Mapea el campo "nombre_usuario" del JSON al atributo Java
  @JsonProperty("nombreUsuario")
  private String nombreUsuario;

  @JsonProperty("contrasena")
  private String contrasena;

  public String getNombreUsuario() { return nombreUsuario; }
  public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

  public String getContrasena() { return contrasena; }
  public void setContrasena(String contrasena) { this.contrasena = contrasena; }
}