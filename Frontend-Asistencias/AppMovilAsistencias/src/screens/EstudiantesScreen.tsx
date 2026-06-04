import { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParams } from '../navigation/RootNavigator';
import { useEstudiantes } from '../hooks/useEstudiantes';
import type { Estudiante, EstadoAsistencia } from '../types';
import { FilaEstudiante } from '../components/FilaEstudainte';
import { NuevoEstudianteModal } from '../components/NuevoEstudianteModal';
import { styles } from './EstudiantesScreen.styles';

type Props = NativeStackScreenProps<RootStackParams, 'Estudiantes'>;

export function EstudiantesScreen({ route }: Props) {
  const { id_clase } = route.params;

  const {
    estudiantes, loading, saving, error,
    fecha, setFecha, asistenciasMarcadas,
    agregarEstudiante, marcarAsistencia, refetch,
  } = useEstudiantes(id_clase);

  const [modalVisible, setModalVisible] = useState(false);
  const [codigo, setCodigo]             = useState('');
  const [nombre, setNombre]             = useState('');

  const handleAgregar = async () => {
    if (!codigo.trim() || !nombre.trim()) {
      Alert.alert('Campos requeridos', 'Ingresa el código y el nombre.');
      return;
    }
    const result = await agregarEstudiante(codigo.trim(), nombre.trim());
    if (result.success) {
      setCodigo('');
      setNombre('');
      setModalVisible(false);
    } else {
      Alert.alert('Error', result.error ?? 'No se pudo agregar el estudiante.');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCodigo('');
    setNombre('');
  };

  const handleMarcar = async (est: Estudiante, estado: EstadoAsistencia) => {
    const result = await marcarAsistencia(est, estado);
    if (!result.success) {
      Alert.alert('Error', result.error ?? 'No se pudo guardar la asistencia.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1D9E75" />
      </View>
    );
  }

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

      <View style={styles.fechaBar}>
        <Text style={styles.fechaLabel}>Fecha:</Text>
        <TextInput
          style={styles.fechaInput}
          value={fecha}
          onChangeText={setFecha}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <FlatList
        data={estudiantes}
        keyExtractor={item => item.idEstudiante.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} colors={['#1D9E75']} />
        }
        ListHeaderComponent={
          <Text style={styles.subtitulo}>
            {estudiantes.length} estudiante{estudiantes.length !== 1 ? 's' : ''}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No hay estudiantes aún.</Text>
            <Text style={styles.emptyHint}>Toca + para agregar uno.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <FilaEstudiante
            estudiante={item}
            estadoMarcado={asistenciasMarcadas[item.idEstudiante]}
            onMarcar={estado => handleMarcar(item, estado)}
          />
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <NuevoEstudianteModal
        visible={modalVisible}
        codigo={codigo}
        nombre={nombre}
        saving={saving}
        onChangeCodigo={setCodigo}
        onChangeNombre={setNombre}
        onAgregar={handleAgregar}
        onClose={handleCloseModal}
      />

    </View>
  );
}