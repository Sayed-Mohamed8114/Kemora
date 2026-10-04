import api from "@/API/axios";

export const addTour = async (tourData) => {
  const response = await api.post("/tours", tourData);
  return response.data;
};

export const getToursForAdmin = async () => {
  const response = await api.get("/tours/admin");
  return response.data;
};

export const getToursByStaff = async () => {
  const response = await api.get("/tours/staff");
  return response.data;
};

export const getToursForCustomers = async () => {
  const response = await api.get("/tours/customer");
  return response.data;
};

export const changeTourStatus = async (tour_id) => {
  const response = await api.patch(`/tours/${tour_id}/status`);
  return response.data;
};

export const updateTour = async (tour_id) => {
  const response = await api.patch(`/tours/${tour_id}`);
  return response.data;
};

export const getTourById = async (tour_id) => {
  const response = await api.get(`/tours/${tour_id}`);
  return response.data;
};

export const uploadTourCover = async (tour_id) => {
  const response = await api.post(`/tours/${tour_id}/cover`);
  return response.data;
};
