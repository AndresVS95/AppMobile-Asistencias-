import { useState, useEffect, useCallback } from 'react';
import {
  getEstudiantesByClase,
  crearYMatricularEstudiante,
  registrarAsistencia,
} from '../services/apiService';
import type { Estudiante } from '../types';

type EstadoAsistencia = Record<number, 'PRESENTE' | 'AUSENTE'>;

type ModalState = {
  visible: boolean;
  nombreEstudiante: string;
  codigo: string;
  errors: { nombreEstudiante?: string; codigo?: string };
};

const MODAL_INITIAL: ModalState = {
  visible: false,
  nombreEstudiante: '',
  codigo: '',
  errors: {},
};

export function useEstudiantes(id_clase: number) {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [asistencias, setAsistencias] = useState<EstadoAsistencia>({});
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [adding, setAdding]           = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [guardado, setGuardado]       = useState(false);
  const [modal, setModal]             = useState<ModalState>(MODAL_INITIAL);

  // ── Carga estudiantes de la clase ─────────────────────────────────────────
  const fetchEstudiantes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEstudiantesByClase(id_clase);
      setEstudiantes(data);
      const estadoInicial: EstadoAsistencia = {};
      data.forEach(e => { estadoInicial[e.id_estudiante] = 'AUSENTE'; });
      setAsistencias(estadoInicial);
    } catch {
      setError('No se pudieron cargar los estudiantes.');
    } finally {
      setLoading(false);
    }
  }, [id_clase]);

  useEffect(() => { fetchEstudiantes(); }, [fetchEstudiantes]);

  // ── Modal helpers ─────────────────────────────────────────────────────────
  const abrirModal  = () => setModal({ ...MODAL_INITIAL, visible: true });
  const cerrarModal = () => setModal(MODAL_INITIAL);

  const handleModalChange = (field: 'nombreEstudiante' | 'codigo') => (text: string) => {
    setModal(m => ({ ...m, [field]: text, errors: { ...m.errors, [field]: undefined } }));
  };

  // ── Crear y matricular estudiante ─────────────────────────────────────────
  const handleAgregarEstudiante = async () => {
    // Validación
    const errors: ModalState['errors'] = {};
    if (!modal.nombreEstudiante.trim()) errors.nombreEstudiante = 'El nombre es obligatorio';
    if (!modal.codigo.trim())           errors.codigo           = 'El código es obligatorio';
    if (Object.keys(errors).length > 0) {
      setModal(m => ({ ...m, errors }));
      return;
    }

    setAdding(true);
    try {
      const nuevo = await crearYMatricularEstudiante(
        id_clase,
        modal.nombreEstudiante.trim(),
        modal.codigo.trim()
      );
      // Agrega directamente a la lista sin recargar
      setEstudiantes(prev => [...prev, nuevo]);
      setAsistencias(prev => ({ ...prev, [nuevo.id_estudiante]: 'AUSENTE' }));
      cerrarModal();
    } catch {
      setModal(m => ({
        ...m,
        errors: { nombreEstudiante: 'Error al guardar. Intenta de nuevo.' },
      }));
    } finally {
      setAdding(false);
    }
  };

  // ── Asistencia ────────────────────────────────────────────────────────────
  const toggleAsistencia = (idEstudiante: number) => {
    setAsistencias(prev => ({
      ...prev,
      [idEstudiante]: prev[idEstudiante] === 'PRESENTE' ? 'AUSENTE' : 'PRESENTE',
    }));
  };

  const marcarTodos = (estado: 'PRESENTE' | 'AUSENTE') => {
    const nuevo: EstadoAsistencia = {};
    estudiantes.forEach(e => { nuevo[e.id_estudiante] = estado; });
    setAsistencias(nuevo);
  };

  const totalPresentes = Object.values(asistencias).filter(e => e === 'PRESENTE').length;
  const totalAusentes  = estudiantes.length - totalPresentes;

  const handleGuardar = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = Object.entries(asistencias).map(
        ([id, estado]) => ({ idEstudiante: Number(id), estado })
      );
      await registrarAsistencia(id_clase, payload);
      setGuardado(true);
      setTimeout(() => setGuardado(false), 3000);
    } catch {
      setError('Error al guardar la asistencia. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return {
    estudiantes, asistencias, loading, saving, adding, error, guardado,
    totalPresentes, totalAusentes,
    modal, abrirModal, cerrarModal, handleModalChange,
    handleAgregarEstudiante, toggleAsistencia, marcarTodos,
    handleGuardar, refetch: fetchEstudiantes,
  };
}