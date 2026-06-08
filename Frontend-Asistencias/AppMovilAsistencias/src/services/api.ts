import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ruta de ip de sus celulares compañeros.
const BASE_URL = 'http://10.144.115.13:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de petición: adjunta el token automáticamente
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de respuesta: maneja errores globales
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expirado: limpia la sesión
      await AsyncStorage.multiRemove(['token', 'user']);
    }
    return Promise.reject(error);
  }
);

export default api;