import api from "@/API/axios";

export const getAllServices = async () => {
  const response = await api.get("/services/");
  return response.data;
};

export const addService = async (serviceForm) => {
  const response = await api.post("/services/", serviceForm);
  return response.data;
};

export const deleteService = async (serviceId) => {
  await api.delete(`/services/${serviceId}`);
};

export const editService = async (serviceId, serviceData) => {
  const response = await api.patch(`/services/${serviceId}`, serviceData);
  return response.data;
};

export const getServiceByName = async (serviceName) => {
  const response = await api.get(
    `/services/name/${encodeURIComponent(serviceName)}`,
  );
  return response.data;
};
