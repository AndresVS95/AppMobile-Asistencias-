import api from './api';
import type { Estudiante } from '../types';

// Estudiantes matriculados en una clase
export async function getEstudiantesByClase(id_clase: number): Promise<Estudiante[]> {
  const response = await api.get<{ estudiantes: Estudiante[] }>(`/clases/${id_clase}`);
  return response.data.estudiantes ?? [];
}

// Crea el estudiante y lo matricula en la clase en dos pasos
export async function crearYMatricularEstudiante(
  idClase: number,
  nombreEstudiante: string,
  codigo: string
): Promise<Estudiante> {
  const res = await api.post<Estudiante>('/estudiantes', { nombreEstudiante, codigo });
  const nuevo = res.data;
  await api.post(`/clases/${idClase}/estudiantes/${nuevo.idEstudiante}`);
  return nuevo;
}

// Envía la asistencia del día
export async function registrarAsistencia(
  id_clase: number,
  asistencias: { idEstudiante: number; estado: 'PRESENTE' | 'AUSENTE' }[]
): Promise<void> {
  const hoy = new Date().toISOString().split('T')[0];
  const payload = asistencias.map(a => ({
    fecha:      hoy,
    estado:     a.estado,
    clase:      { idClase: id_clase },
    estudiante: { idEstudiante: a.idEstudiante },
  }));
  await api.post('/asistencias', payload);
}