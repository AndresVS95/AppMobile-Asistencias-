import { useState, useEffect, useCallback } from 'react';
import {
  getEstudiantesPorClase,
  createEstudiante,
  matricularEstudiante,
} from '../services/estudiantesService';
import { guardarAsistencias } from '../services/asistenciasService';
import type { Estudiante, EstadoAsistencia } from '../types';

export function useEstudiantes(idClase: number) {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [fecha, setFecha]             = useState(
    new Date().toISOString().split('T')[0]
  );
  const [asistenciasMarcadas, setAsistenciasMarcadas] = useState<
    Record<number, EstadoAsistencia>
  >({});

  const cargarEstudiantes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const datos = await getEstudiantesPorClase(idClase);
      setEstudiantes(datos);
    } catch {
      setError('No se pudo cargar la lista de estudiantes.');
    } finally {
      setLoading(false);
    }
  }, [idClase]);

  useEffect(() => { cargarEstudiantes(); }, [cargarEstudiantes]);

  // Al cambiar la fecha se limpian las asistencias marcadas
  useEffect(() => { setAsistenciasMarcadas({}); }, [fecha]);

  const agregarEstudiante = async (
    codigo: string,
    nombreEstudiante: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setSaving(true);
      const nuevo = await createEstudiante({ codigo, nombreEstudiante });
      await matricularEstudiante(idClase, nuevo.idEstudiante);
      await cargarEstudiantes();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo agregar el estudiante.';
      return { success: false, error: message };
    }
  };

  const marcarAsistencia = async (
  estudiante: Estudiante,
  estado: EstadoAsistencia
): Promise<{ success: boolean; error?: string }> => {
  try {
    await guardarAsistencias([
      {
        fecha,
        estado,
        estudiante: { idEstudiante: estudiante.idEstudiante },
        clase:      { idClase },
      },
    ]);
    // Solo se actualiza el estado local una vez confirmado el servidor
    setAsistenciasMarcadas(prev => ({
      ...prev,
      [estudiante.idEstudiante]: estado,
    }));
    return { success: true };
  } catch {
    return { success: false, error: 'Error al guardar la asistencia.' };
  }
};

  return {
    estudiantes,
    loading,
    saving,
    error,
    fecha,
    setFecha,
    asistenciasMarcadas,
    agregarEstudiante,
    marcarAsistencia,
    refetch: cargarEstudiantes,
  };
}
