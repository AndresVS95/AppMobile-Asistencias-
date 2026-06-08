package com.example.asistencia.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**") // Permite CORS en todas las rutas de tu API
      .allowedOrigins( "http://10.144.115.13:8080",
                      "http://localhost:8081") // El puerto por defecto de Vite (React)
      .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
      .allowedHeaders("*")
      .allowCredentials(true);
  }
}
