import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { useLogin } from '../hooks/useLogin';

export function LoginScreen() {
  const { values, errors, loading, apiError, handleChange, handleSubmit } = useLogin();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Sistema de Asistencias</Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>

          {/* Error global de la API */}
          {apiError && (
            <View style={styles.apiErrorBox}>
              <Text style={styles.apiErrorText}>{apiError}</Text>
            </View>
          )}

          {/* Campo usuario */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput
              style={[styles.input, errors.nombreUsuario && styles.inputError]}
              placeholder="nombre de usuario"
              placeholderTextColor="#9CA3AF"
              value={values.nombreUsuario}
              onChangeText={handleChange('nombreUsuario')}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.nombreUsuario && (
              <Text style={styles.errorText}>{errors.nombreUsuario}</Text>
            )}
          </View>

          {/* Campo contraseña */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={[styles.input, errors.contrasena && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              value={values.contrasena}
              onChangeText={handleChange('contrasena')}
              secureTextEntry
            />
            {errors.contrasena && (
              <Text style={styles.errorText}>{errors.contrasena}</Text>
            )}
          </View>

          {/* Botón */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.buttonText}>Iniciar sesión</Text>
            }
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  form: {
    gap: 16,
  },
  apiErrorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
  },
  apiErrorText: {
    color: '#B91C1C',
    fontSize: 13,
    textAlign: 'center',
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
  },
  button: {
    backgroundColor: '#1D9E75',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});