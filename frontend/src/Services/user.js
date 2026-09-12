import api from "../API/axios";

export const login = async (formData) => {
  const response = await api.post("/auth/login", formData);
  return response.data;
};
