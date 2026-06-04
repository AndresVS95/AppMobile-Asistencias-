import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from '../screens/CursosScreen.styles';
import type { Clase } from '../types';

interface Props {
  clase: Clase;
  onPress: () => void;
}

export function ClaseCard({ clase, onPress }: Props) {
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