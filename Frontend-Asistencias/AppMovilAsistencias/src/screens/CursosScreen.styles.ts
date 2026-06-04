import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  centered:  { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },

  // ── Top bar ────────────────────────────────────────────────────────────────
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  greeting:   { fontSize: 15, fontWeight: '600', color: '#111827' },
  logoutText: { fontSize: 14, color: '#EF4444', fontWeight: '500' },

  // ── Lista ──────────────────────────────────────────────────────────────────
  list: { padding: 16, gap: 12, paddingBottom: 90 },

  // ── Tarjeta ────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardAccent:  { width: 5, backgroundColor: '#1D9E75' },
  cardBody:    { flex: 1, padding: 14, gap: 4 },
  cardTitle:   { fontSize: 16, fontWeight: '600', color: '#111827' },
  cardDocente: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },

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

  // ── Estados ────────────────────────────────────────────────────────────────
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
  inputError:  { borderColor: '#EF4444' },
  fieldError:  { fontSize: 12, color: '#EF4444', marginTop: -4 },

  modalActions: { flexDirection: 'row', gap: 10, marginTop: 6 },
  cancelBtn: {
    flex: 1, borderWidth: 1, borderColor: '#D1D5DB',
    borderRadius: 10, paddingVertical: 12, alignItems: 'center',
  },
  cancelText: { fontSize: 15, color: '#6B7280', fontWeight: '500' },
  saveBtn: {
    flex: 1, backgroundColor: '#1D9E75',
    borderRadius: 10, paddingVertical: 12, alignItems: 'center',
  },
  saveText:    { fontSize: 15, color: '#fff', fontWeight: '600' },
  btnDisabled: { opacity: 0.6 },
});