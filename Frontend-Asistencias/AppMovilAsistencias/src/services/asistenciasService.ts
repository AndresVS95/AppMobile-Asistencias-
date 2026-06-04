import api from './api';
import type { Asistencia } from '../types';

export const guardarAsistencias = async (asistencias: Asistencia[]): Promise<void> => {
  await api.post('/asistencias', asistencias);
};
