import api from './api';
import type { LoginResponse } from '../types';

type LoginPayload = {
  nombreUsuario: string;   // campo real de la BD
  contrasena: string;
};

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/profesores/login', payload);
  return response.data;
}