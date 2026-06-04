import {
  Modal, View, Text, TextInput,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { styles } from '../screens/EstudiantesScreen.styles';

interface Props {
  visible: boolean;
  codigo: string;
  nombre: string;
  saving: boolean;
  onChangeCodigo: (text: string) => void;
  onChangeNombre: (text: string) => void;
  onAgregar: () => void;
  onClose: () => void;
}

export function NuevoEstudianteModal({
  visible, codigo, nombre, saving,
  onChangeCodigo, onChangeNombre, onAgregar, onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>

          <Text style={styles.modalTitle}>Nuevo estudiante</Text>

          <TextInput
            style={styles.input}
            placeholder="Código"
            placeholderTextColor="#9CA3AF"
            value={codigo}
            onChangeText={onChangeCodigo}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#9CA3AF"
            value={nombre}
            onChangeText={onChangeNombre}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              disabled={saving}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveBtn, saving && styles.btnDisabled]}
              onPress={onAgregar}
              disabled={saving}
            >
              {saving
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.saveText}>Agregar</Text>
              }
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}