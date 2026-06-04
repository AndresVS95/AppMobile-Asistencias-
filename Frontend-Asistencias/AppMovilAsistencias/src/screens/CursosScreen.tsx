import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParams } from '../navigation/RootNavigator';
import { useAuth } from '../context/AutoContext';
import { useClases } from '../hooks/useCursos';
import { ClaseCard } from '../components/ClaseCard';
import { NuevoCursoModal } from '../components/NuevoCursoModal';

import { styles } from './CursosScreen.styles';

type Props = NativeStackScreenProps<RootStackParams, 'Cursos'>;

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

      <View style={styles.topBar}>
        <Text style={styles.greeting}>Hola, {profesor?.nombre}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

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

      <TouchableOpacity style={styles.fab} onPress={openModal} activeOpacity={0.85}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <NuevoCursoModal
        visible={modal.visible}
        nombre={modal.nombre}
        errors={modal.errors}
        saving={saving}
        onChange={handleModalChange}
        onSave={handleCreate}
        onClose={closeModal}
      />

      

    </View>
  );
}