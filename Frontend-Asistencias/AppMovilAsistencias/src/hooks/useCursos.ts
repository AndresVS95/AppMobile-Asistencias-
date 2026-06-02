import { useState, useEffect, useCallback } from 'react';
import { getClases, createClase } from '../services/cursoService';
import { useAuth } from '../context/AutoContext';
import type { Clase } from '../types';

type ModalState = {
  visible: boolean;
  nombre: string;
  errors: { nombre?: string };
};

const MODAL_INITIAL: ModalState = {
  visible: false,
  nombre: '',
  errors: {},
};

export function useClases() {
  const { profesor } = useAuth();
  const [clases, setClases]   = useState<Clase[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [modal, setModal]     = useState<ModalState>(MODAL_INITIAL);

  const fetchClases = useCallback(async () => {
    if (!profesor) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getClases(profesor.id_profesor);
      setClases(data);
    } catch {
      setError('No se pudieron cargar las clases. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [profesor]);

  useEffect(() => { fetchClases(); }, [fetchClases]);

  const openModal  = () => setModal({ ...MODAL_INITIAL, visible: true });
  const closeModal = () => setModal(MODAL_INITIAL);

  const handleModalChange = (text: string) => {
    setModal(m => ({ ...m, nombre: text, errors: {} }));
  };

  const handleCreate = async () => {
    if (!profesor) return;
    if (!modal.nombre.trim()) {
      setModal(m => ({ ...m, errors: { nombre: 'El nombre es obligatorio' } }));
      return;
    }
    setSaving(true);
    try {
      const nueva = await createClase(modal.nombre, profesor.id_profesor);
      setClases(prev => [...prev, nueva]);
      closeModal();
    } catch {
      setModal(m => ({ ...m, errors: { nombre: 'Error al guardar. Intenta de nuevo.' } }));
    } finally {
      setSaving(false);
    }
  };

  return {
    clases, loading, saving, error,
    modal, openModal, closeModal,
    handleModalChange, handleCreate,
    refetch: fetchClases,
  };
}