import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Estudiante } from '../types';

type Props = {
  estudiante: Estudiante;
  estado: 'PRESENTE' | 'AUSENTE';
  onToggle: () => void;
};

export function EstudianteRow({ estudiante, estado, onToggle }: Props) {
  const presente = estado === 'PRESENTE';
  const inicial  = estudiante?.nombreEstudiante?.charAt(0)?.toUpperCase() ?? '?';
  const nombre   = estudiante?.nombreEstudiante ?? 'Sin nombre';
  const codigo   = estudiante?.codigo ?? '-';
  return (
    <View style={styles.row}>
      <View style={[styles.avatar, presente && styles.avatarPresente]}>
        <Text style={styles.avatarText}>{inicial}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.codigo}>{codigo}</Text>
      </View>
      <TouchableOpacity
        style={[styles.badge, presente ? styles.badgePresente : styles.badgeAusente]}
        onPress={onToggle}
        activeOpacity={0.75}
      >
        <Text style={[styles.badgeText, presente ? styles.textPresente : styles.textAusente]}>
          {presente ? 'Presente' : 'Ausente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff', borderRadius: 10,
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderWidth: 1, borderColor: '#E5E7EB', gap: 12,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center',
  },
  avatarPresente: { backgroundColor: '#D1FAE5' },
  avatarText:     { fontSize: 16, fontWeight: '600', color: '#374151' },
  info:           { flex: 1 },
  nombre:         { fontSize: 14, fontWeight: '600', color: '#111827' },
  codigo:         { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  badge:          { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  badgePresente:  { backgroundColor: '#D1FAE5', borderColor: '#6EE7B7' },
  badgeAusente:   { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' },
  badgeText:      { fontSize: 12, fontWeight: '600' },
  textPresente:   { color: '#065F46' },
  textAusente:    { color: '#92400E' },
});