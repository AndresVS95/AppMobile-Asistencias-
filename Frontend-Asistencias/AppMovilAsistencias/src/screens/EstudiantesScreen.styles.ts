import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  centered:  { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },

  // ── Barra de fecha ─────────────────────────────────────────────────────────
  fechaBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 10,
  },
  fechaLabel: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  fechaInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    color: '#111827',
  },

  // ── Lista ──────────────────────────────────────────────────────────────────
  subtitulo: { fontSize: 13, color: '#9CA3AF', marginBottom: 8, paddingHorizontal: 4 },
  list:      { padding: 16, gap: 10, paddingBottom: 90 },

  // ── Fila estudiante ────────────────────────────────────────────────────────
  fila: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    gap: 10,
  },
  filaInfo:   { gap: 2 },
  filaNombre: { fontSize: 15, fontWeight: '600', color: '#111827' },
  filaCodigo: { fontSize: 12, color: '#9CA3AF' },

  // ── Botones de asistencia ──────────────────────────────────────────────────
  botonesAsistencia: { flexDirection: 'row', gap: 8 },
  btnEstado: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnEstadoTexto: { color: '#fff', fontSize: 12, fontWeight: '600' },

  // ── Badge de estado ────────────────────────────────────────────────────────
  estadoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  estadoTexto: { color: '#fff', fontSize: 13, fontWeight: '600' },

  // ── FAB ────────────────────────────────────────────────────────────────────
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 28,
    backgroundColor: '#1D9E75',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: { fontSize: 28, color: '#fff', lineHeight: 32 },

  // ── Estados de carga / error ───────────────────────────────────────────────
  errorText: { fontSize: 15, color: '#B91C1C', textAlign: 'center', marginBottom: 12 },
  retryBtn:  { backgroundColor: '#1D9E75', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
  emptyText: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  emptyHint: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },

  // ── Modal ──────────────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 },

  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#111827',
  },

  modalActions: { flexDirection: 'row', gap: 10, marginTop: 6 },
  cancelBtn: {
    flex: 1, borderWidth: 1, borderColor: '#D1D5DB',
    borderRadius: 10, paddingVertical: 12, alignItems: 'center',
  },
  cancelText:  { fontSize: 15, color: '#6B7280', fontWeight: '500' },
  saveBtn: {
    flex: 1, backgroundColor: '#1D9E75',
    borderRadius: 10, paddingVertical: 12, alignItems: 'center',
  },
  saveText:    { fontSize: 15, color: '#fff', fontWeight: '600' },
  btnDisabled: { opacity: 0.6 },
});