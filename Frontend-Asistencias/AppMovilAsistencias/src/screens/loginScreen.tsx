import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { styles } from './loginScreen.styles';

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

          {apiError && (
            <View style={styles.apiErrorBox}>
              <Text style={styles.apiErrorText}>{apiError}</Text>
            </View>
          )}

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