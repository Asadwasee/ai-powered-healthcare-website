import api from './api';

export const createAppointment = async (payload) => {
  const { data } = await api.post('/appointments', payload);

  return data;
};

export const fetchAppointments = async ({ email, doctorId } = {}) => {
  const { data } = await api.get('/appointments', {
    params: {
      email: email || undefined,
      doctorId: doctorId || undefined,
    },
  });

  return data;
};