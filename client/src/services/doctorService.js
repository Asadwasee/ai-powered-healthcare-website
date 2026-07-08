import api from './api';

export const fetchDoctors = async ({ search = '', specialization = '' } = {}) => {
  const { data } = await api.get('/doctors', {
    params: {
      search: search || undefined,
      specialization: specialization || undefined,
    },
  });

  return data;
};

export const fetchDoctorById = async (id) => {
  const { data } = await api.get(`/doctors/${id}`);

  return data;
};