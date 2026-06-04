import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParams } from '../navigation/RootNavigator';
import { useAuth } from '../context/AutoContext';
import { useClases } from '../hooks/useCursos';

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

      

    </View>
  );
}