import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../context/AutoContext';

// Screens
import { LoginScreen }        from '../screens/loginScreen';
import { CursosScreen }       from '../screens/CursosScreen';
import { EstudiantesScreen }  from '../screens/EstudiantesScreen';


export type RootStackParams = {
  Login:        undefined;
  Cursos:       undefined;
  Estudiantes:  { id_clase: number; nombre_clase: string };
};

const Stack = createNativeStackNavigator<RootStackParams>();

// ─── 2. Navegador de autenticación (usuario NO logueado) ──────────────────────
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// ─── 3. Navegador principal (usuario logueado) ────────────────────────────────
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:     { backgroundColor: '#1D9E75' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="Cursos"
        component={CursosScreen}
        options={{ title: 'Mis Cursos' }}
      />
      <Stack.Screen
        name="Estudiantes"
        component={EstudiantesScreen}
        options={({ route }) => ({ title: route.params.nombre_clase })}
      />
    </Stack.Navigator>
  );
}

// ─── 4. Navigator raíz ───────────────────────────────────────────────────────
export function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Mientras AsyncStorage carga la sesión, muestra un spinner
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1D9E75" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}