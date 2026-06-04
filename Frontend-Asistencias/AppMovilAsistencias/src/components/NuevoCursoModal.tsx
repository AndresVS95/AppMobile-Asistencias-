import {
  Modal, View, Text, TextInput,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { styles } from '../screens/CursosScreen.styles';

interface Props {
  visible: boolean;
  nombre: string;
  errors: { nombre?: string };
  saving: boolean;
  onChange: (text: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export function NuevoCursoModal({
  visible, nombre, errors, saving, onChange, onSave, onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>

          <Text style={styles.modalTitle}>Nuevo curso</Text>

          <TextInput
            style={[styles.input, errors.nombre && styles.inputError]}
            placeholder="Nombre de la clase"
            placeholderTextColor="#9CA3AF"
            value={nombre}
            onChangeText={onChange}
          />
          {errors.nombre && (
            <Text style={styles.fieldError}>{errors.nombre}</Text>
          )}

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
              onPress={onSave}
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
  );
}