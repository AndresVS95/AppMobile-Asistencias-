// Modelo de datos para la app de asistencias, de la forma que se traen los valores del backend. Aquí defines los tipos de datos que usas en toda la app.

export type Profesor = {
  id_profesor: number;      
  cedula: string;
  nombre: string;
  nombre_usuario: string;
};

export type Clase = {
  idClase: number;
  nombre: string;        
  profesor?: {
    idProfesor: number;
    nombre: string;
  };
};

export type Estudiante = {
  id_estudiante: number;
  codigo: string;
  nombreEstudiante: string;
};

export type LoginResponse = {
  token: string;
  profesor: Profesor;
};