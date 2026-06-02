import { useState } from 'react';
import { useAuth } from '../context/AutoContext';
import { loginRequest } from '../services/authService';

type FormState = {
  nombreUsuario: string;
  contrasena: string;
};

type FormErrors = Partial<FormState>;

// ─── Validación ───────────────────────────────────────────────────────────────
function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.nombreUsuario.trim())
    errors.nombreUsuario = 'El usuario es obligatorio';
  if (!values.contrasena.trim())
    errors.contrasena = 'La contraseña es obligatoria';
  else if (values.contrasena.length < 4)
    errors.contrasena = 'Mínimo 4 caracteres';
  return errors;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLogin() {
  const { login } = useAuth();

  const [values, setValues]     = useState<FormState>({ nombreUsuario: '', contrasena: '' });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState) => (text: string) => {
    setValues(v => ({ ...v, [field]: text }));
    if (errors[field])  setErrors(e => ({ ...e, [field]: undefined }));
    if (apiError)       setApiError(null);
  };

  const handleSubmit = async () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setApiError(null);
    try {
      const { token, profesor } = await loginRequest(values);
      await login(token, profesor);
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 401) setApiError('Usuario o contraseña incorrectos');
      else if (status >= 500) setApiError('Error en el servidor, intenta más tarde');
      else setApiError('Sin conexión. Verifica tu internet');
    } finally {
      setLoading(false);
    }
  };

  return { values, errors, loading, apiError, handleChange, handleSubmit };
}