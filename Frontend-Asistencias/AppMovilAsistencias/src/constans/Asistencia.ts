import type { EstadoAsistencia } from '../types';

export const ESTADO_COLOR: Record<EstadoAsistencia, string> = {
  PRESENTE: '#1D9E75',
  EXCUSADO: '#F59E0B',
  AUSENTE:  '#EF4444',
};

export const ESTADO_LABEL: Record<EstadoAsistencia, string> = {
  PRESENTE: 'Presente',
  EXCUSADO: 'Excusado',
  AUSENTE:  'Ausente',
};