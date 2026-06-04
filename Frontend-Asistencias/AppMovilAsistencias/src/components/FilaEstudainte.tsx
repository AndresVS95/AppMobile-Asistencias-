import { View, Text, TouchableOpacity } from 'react-native';
import type { Estudiante, EstadoAsistencia } from '../types';
import { ESTADO_COLOR, ESTADO_LABEL } from '../constans/Asistencia';
import { styles } from '../screens/EstudiantesScreen.styles';

interface Props {
  estudiante: Estudiante;
  estadoMarcado?: EstadoAsistencia;
  onMarcar: (estado: EstadoAsistencia) => void;
}

export function FilaEstudiante({ estudiante, estadoMarcado, onMarcar }: Props) {
  return (
    <View style={styles.fila}>
      <View style={styles.filaInfo}>
        <Text style={styles.filaNombre}>{estudiante.nombreEstudiante}</Text>
        <Text style={styles.filaCodigo}>{estudiante.codigo}</Text>
      </View>

      {estadoMarcado ? (
        <View style={[styles.estadoBadge, { backgroundColor: ESTADO_COLOR[estadoMarcado] }]}>
          <Text style={styles.estadoTexto}>{ESTADO_LABEL[estadoMarcado]}</Text>
        </View>
      ) : (
        <View style={styles.botonesAsistencia}>
          {(['PRESENTE', 'EXCUSADO', 'AUSENTE'] as EstadoAsistencia[]).map(e => (
            <TouchableOpacity
              key={e}
              style={[styles.btnEstado, { backgroundColor: ESTADO_COLOR[e] }]}
              onPress={() => onMarcar(e)}
              activeOpacity={0.75}
            >
              <Text style={styles.btnEstadoTexto}>{ESTADO_LABEL[e]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}