import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootNavigator";
import { useEstudiantes } from "../hooks/useEstudiantes";
import type { Estudiante, EstadoAsistencia } from "../types";

type Props = NativeStackScreenProps<RootStackParams, "Estudiantes">;

// ─── Colores por estado ───────────────────────────────────────────────────────
const ESTADO_COLOR: Record<EstadoAsistencia, string> = {
  PRESENTE: "#1D9E75",
  EXCUSADO: "#F59E0B",
  AUSENTE: "#EF4444",
};

const ESTADO_LABEL: Record<EstadoAsistencia, string> = {
  PRESENTE: "Presente",
  EXCUSADO: "Excusado",
  AUSENTE: "Ausente",
};

// ─── Fila de estudiante ───────────────────────────────────────────────────────
function FilaEstudiante({
  estudiante,
  estadoMarcado,
  onMarcar,
}: {
  estudiante: Estudiante;
  estadoMarcado?: EstadoAsistencia;
  onMarcar: (estado: EstadoAsistencia) => void;
}) {
  return (
    <View style={styles.fila}>
      <View style={styles.filaInfo}>
        <Text style={styles.filaNombre}>{estudiante.nombreEstudiante}</Text>
        <Text style={styles.filaCodigo}>{estudiante.codigo}</Text>
      </View>

      {estadoMarcado ? (
        <View
          style={[
            styles.estadoBadge,
            { backgroundColor: ESTADO_COLOR[estadoMarcado] },
          ]}
        >
          <Text style={styles.estadoTexto}>{ESTADO_LABEL[estadoMarcado]}</Text>
        </View>
      ) : (
        <View style={styles.botonesAsistencia}>
          {(["PRESENTE", "EXCUSADO", "AUSENTE"] as EstadoAsistencia[]).map(
            (e) => (
              <TouchableOpacity
                key={e}
                style={[styles.btnEstado, { backgroundColor: ESTADO_COLOR[e] }]}
                onPress={() => onMarcar(e)}
                activeOpacity={0.75}
              >
                <Text style={styles.btnEstadoTexto}>{ESTADO_LABEL[e]}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      )}
    </View>
  );
}

// ─── Pantalla principal ───────────────────────────────────────────────────────
export function EstudiantesScreen({ route }: Props) {
  const { id_clase, nombre_clase } = route.params;

  const {
    estudiantes,
    loading,
    saving,
    error,
    fecha,
    setFecha,
    asistenciasMarcadas,
    agregarEstudiante,
    marcarAsistencia,
    refetch,
  } = useEstudiantes(id_clase);

  const [modalVisible, setModalVisible] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");

  // ─── Resumen de asistencia ──────────────────────────────────────────────────
  const totalEstudiantes = estudiantes.length;

  const totalPresentes = Object.values(asistenciasMarcadas).filter(
    (estado) => estado === "PRESENTE",
  ).length;

  const totalAusentes = Object.values(asistenciasMarcadas).filter(
    (estado) => estado === "AUSENTE",
  ).length;

  const totalExcusados = Object.values(asistenciasMarcadas).filter(
    (estado) => estado === "EXCUSADO",
  ).length;

  const totalMarcados = Object.keys(asistenciasMarcadas).length;

  const totalPendientes = totalEstudiantes - totalMarcados;

  const handleAgregar = async () => {
    const codigoLimpio = codigo.trim();
    const nombreLimpio = nombre.trim();

    if (!codigoLimpio || !nombreLimpio) {
      Alert.alert("Campos requeridos", "Ingresa el código y el nombre.");
      return;
    }

    if (codigoLimpio.length < 3) {
      Alert.alert(
        "Código inválido",
        "El código debe tener al menos 3 caracteres.",
      );
      return;
    }

    if (nombreLimpio.length < 3) {
      Alert.alert(
        "Nombre inválido",
        "El nombre debe tener al menos 3 caracteres.",
      );
      return;
    }

    const existeCodigo = estudiantes.some(
      (estudiante) =>
        estudiante.codigo?.trim().toLowerCase() === codigoLimpio.toLowerCase(),
    );

    if (existeCodigo) {
      Alert.alert(
        "Estudiante repetido",
        "Ya existe un estudiante con ese código en esta clase.",
      );
      return;
    }

    const result = await agregarEstudiante(codigoLimpio, nombreLimpio);

    if (result.success) {
      setCodigo("");
      setNombre("");
      setModalVisible(false);
    } else {
      Alert.alert("Error", result.error ?? "No se pudo agregar el estudiante.");
    }
  };

  const handleMarcar = async (est: Estudiante, estado: EstadoAsistencia) => {
    const result = await marcarAsistencia(est, estado);

    if (!result.success) {
      Alert.alert("Error", result.error ?? "No se pudo guardar la asistencia.");
      return;
    }

    const yaEstabaMarcado = Boolean(asistenciasMarcadas[est.idEstudiante]);
    const nuevoTotalMarcados =
      Object.keys(asistenciasMarcadas).length + (yaEstabaMarcado ? 0 : 1);

    if (nuevoTotalMarcados === estudiantes.length && estudiantes.length > 0) {
      Alert.alert(
        "Asistencia completa",
        `Ya marcaste la asistencia de todos los estudiantes para la fecha ${fecha}.`,
      );
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
      {/* Fecha */}
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

      {/* Resumen de asistencia */}
      <View style={styles.resumenContainer}>
        <View style={styles.resumenCard}>
          <Text style={styles.resumenNumero}>{totalEstudiantes}</Text>
          <Text style={styles.resumenLabel}>Total</Text>
        </View>

        <View style={styles.resumenCard}>
          <Text style={styles.resumenNumero}>{totalPresentes}</Text>
          <Text style={styles.resumenLabel}>Presentes</Text>
        </View>

        <View style={styles.resumenCard}>
          <Text style={styles.resumenNumero}>{totalAusentes}</Text>
          <Text style={styles.resumenLabel}>Ausentes</Text>
        </View>

        <View style={styles.resumenCard}>
          <Text style={styles.resumenNumero}>{totalExcusados}</Text>
          <Text style={styles.resumenLabel}>Excusados</Text>
        </View>

        <View style={styles.resumenCard}>
          <Text style={styles.resumenNumero}>{totalPendientes}</Text>
          <Text style={styles.resumenLabel}>Pendientes</Text>
        </View>
      </View>

      {/* Lista */}
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item.idEstudiante.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={["#1D9E75"]}
          />
        }
        ListHeaderComponent={
          <Text style={styles.subtitulo}>
            {estudiantes.length} estudiante{estudiantes.length !== 1 ? "s" : ""}
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
            onMarcar={(estado) => handleMarcar(item, estado)}
          />
        )}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal agregar estudiante */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Nuevo estudiante</Text>

            <TextInput
              style={styles.input}
              placeholder="Código"
              placeholderTextColor="#9CA3AF"
              value={codigo}
              onChangeText={setCodigo}
            />

            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#9CA3AF"
              value={nombre}
              onChangeText={setNombre}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setCodigo("");
                  setNombre("");
                }}
                disabled={saving}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveBtn, saving && styles.btnDisabled]}
                onPress={handleAgregar}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveText}>Agregar</Text>
                )}
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
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  fechaBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 10,
  },

  fechaLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  fechaInput: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    color: "#111827",
  },

  resumenContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 8,
  },

  resumenCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 8,
    alignItems: "center",
  },

  resumenNumero: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  resumenLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 2,
  },

  subtitulo: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  list: {
    padding: 16,
    gap: 10,
    paddingBottom: 90,
  },

  fila: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    gap: 10,
  },

  filaInfo: {
    gap: 2,
  },

  filaNombre: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  filaCodigo: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  botonesAsistencia: {
    flexDirection: "row",
    gap: 8,
  },

  btnEstado: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  btnEstadoTexto: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  estadoBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  estadoTexto: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    right: 24,
    bottom: 28,
    backgroundColor: "#1D9E75",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  fabText: {
    fontSize: 28,
    color: "#fff",
    lineHeight: 32,
  },

  errorText: {
    fontSize: 15,
    color: "#B91C1C",
    textAlign: "center",
    marginBottom: 12,
  },

  retryBtn: {
    backgroundColor: "#1D9E75",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryText: {
    color: "#fff",
    fontWeight: "600",
  },

  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },

  emptyHint: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: "#111827",
  },

  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  cancelText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#1D9E75",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  saveText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
  },

  btnDisabled: {
    opacity: 0.6,
  },
});
