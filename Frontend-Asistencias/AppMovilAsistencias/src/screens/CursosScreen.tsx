import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  Modal, ActivityIndicator, StyleSheet, RefreshControl, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParams } from '../navigation/RootNavigator';
import { useAuth } from '../context/AutoContext';
import { useClases } from '../hooks/useCursos';
import type { Clase } from '../types';

type Props = NativeStackScreenProps<RootStackParams, 'Cursos'>;

// ─── Tarjeta de clase ─────────────────────────────────────────────────────────
function ClaseCard({ clase, onPress }: { clase: Clase; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.cardAccent} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{clase.nombre}</Text>
        <Text style={styles.cardDocente}>Clase #{clase.idClase}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Pantalla principal ───────────────────────────────────────────────────────
export function CursosScreen({ navigation }: Props) {
  const { logout, profesor } = useAuth();
  const {
    clases, loading, saving, error,
    modal, openModal, closeModal,
    handleModalChange, handleCreate, refetch,
  } = useClases();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: logout },
      ]
    );
  };

  // ── Estado: cargando ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1D9E75" />
      </View>
    );
  }

  // ── Estado: error ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={refetch}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Saludo + logout */}
      <View style={styles.topBar}>
        <Text style={styles.greeting}>Hola, {profesor?.nombre}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de cursos */}
      <FlatList
        data={clases}
        keyExtractor={item => item.idClase.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} colors={['#1D9E75']} />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No tienes clases aún.</Text>
            <Text style={styles.emptyHint}>Toca + para crear una.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ClaseCard
            clase={item}
            onPress={() =>
              navigation.navigate('Estudiantes', {
                id_clase: item.idClase,
                nombre_clase: item.nombre,
              })
            }
          />
        )}
      />

      {/* Botón flotante para crear curso */}
      <TouchableOpacity style={styles.fab} onPress={openModal} activeOpacity={0.85}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* ── Modal: nuevo curso ─────────────────────────────────────────────── */}
      <Modal visible={modal.visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Nuevo curso</Text>

            <TextInput
              style={[styles.input, modal.errors.nombre && styles.inputError]}
              placeholder="Nombre de la clase"
              placeholderTextColor="#9CA3AF"
              value={modal.nombre}
              onChangeText={handleModalChange}
            />
            {modal.errors.nombre && (
              <Text style={styles.fieldError}>{modal.errors.nombre}</Text>
            )}

            {/* Botones */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={closeModal}
                disabled={saving}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveBtn, saving && styles.btnDisabled]}
                onPress={handleCreate}
                disabled={saving}
              >
                {saving
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.saveText}>Guardar</Text>
                }
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  centered:  { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },

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

  list: { padding: 16, gap: 12, paddingBottom: 90 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardAccent: { width: 5, backgroundColor: '#1D9E75' },
  cardBody:   { flex: 1, padding: 14, gap: 4 },
  cardTitle:  { fontSize: 16, fontWeight: '600', color: '#111827' },
  cardDesc:   { fontSize: 13, color: '#6B7280' },
  cardDocente:{ fontSize: 12, color: '#9CA3AF', marginTop: 4 },

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

  errorText: { fontSize: 15, color: '#B91C1C', textAlign: 'center', marginBottom: 12 },
  retryBtn:  { backgroundColor: '#1D9E75', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
  emptyText: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  emptyHint: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },

  // Modal
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
  inputMultiline: { height: 80, textAlignVertical: 'top' },
  inputError:     { borderColor: '#EF4444' },
  fieldError:     { fontSize: 12, color: '#EF4444', marginTop: -4 },

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
  saveText:   { fontSize: 15, color: '#fff', fontWeight: '600' },
  btnDisabled:{ opacity: 0.6 },
});