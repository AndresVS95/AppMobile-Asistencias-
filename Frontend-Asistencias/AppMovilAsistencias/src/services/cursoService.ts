import api from './api';
import type { Clase } from '../types';

// Obtiene las clases del profesor autenticado
export async function getClases(idProfesor: number): Promise<Clase[]> {
  const response = await api.get<Clase[]>(`/clases?idProfesor=${idProfesor}`);
  return response.data;
}

// Crea una nueva clase
export async function createClase(nombre: string, idProfesor: number): Promise<Clase> {
  const response = await api.post<Clase>('/clases', { nombre, idProfesor });
  return response.data;
}