import api from './api';
import type { Estudiante } from '../types';

export const getEstudiantesPorClase = async (idClase: number): Promise<Estudiante[]> => {
  const response = await api.get(`/clases/${idClase}`);
  return response.data.estudiantes || [];
};

export const createEstudiante = async (datos: {
  codigo: string;
  nombreEstudiante: string;
}): Promise<Estudiante> => {
  const response = await api.post('/estudiantes', datos);
  return response.data;
};

export const matricularEstudiante = async (
  idClase: number,
  idEstudiante: number
): Promise<void> => {
  await api.post(`/clases/${idClase}/estudiantes/${idEstudiante}`);
};
