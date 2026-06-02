// src/components/Button.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';

// Definimos qué propiedades va a recibir nuestro botón
interface CustomButtonProps extends TouchableOpacityProps {
  titulo: string;
  cargando?: boolean;
  estiloBoton?: StyleProp<ViewStyle>; // Por si queremos cambiarle el ancho o margen en alguna pantalla
  estiloTexto?: StyleProp<TextStyle>; // Por si queremos cambiar el tamaño de letra
}

export default function Button({ 
  titulo, 
  cargando = false, 
  estiloBoton, 
  estiloTexto, 
  disabled, 
  ...props 
}: CustomButtonProps) {
  
  return (
    <TouchableOpacity 
      // Combinamos el estilo base, el estilo de deshabilitado (si aplica) y estilos extra
      style={[
        styles.botonBase, 
        (disabled || cargando) && styles.botonDeshabilitado, 
        estiloBoton
      ]} 
      // El botón se bloquea si está explícitamente deshabilitado o si está cargando
      disabled={disabled || cargando} 
      activeOpacity={0.8}
      {...props}
    >
      {cargando ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.textoBase, estiloTexto]}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botonBase: {
    backgroundColor: '#4f46e5', // Nuestro color principal institucional
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    elevation: 2, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botonDeshabilitado: {
    backgroundColor: '#9ca3af', // Se vuelve gris cuando está bloqueado
    elevation: 0,
    shadowOpacity: 0,
  },
  textoBase: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});