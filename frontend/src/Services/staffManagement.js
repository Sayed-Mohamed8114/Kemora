import api from "../API/axios";

export const addStaff = async (staffData) => {
  const response = await api.post("/staff_management/", staffData);

  return response.data;
};

export const getStaff = async () => {
  const response = await api.get("/staff_management/");

  return response.data;
};

export const editStaff = async (userId, staffData) => {
  const response = await api.patch(`/staff_management/${userId}`, staffData);

  return response.data;
};

export const deleteStaff = async (userId) => {
  const response = await api.delete(`/staff_management/${userId}`);

  return response.data;
};

export const getStaffByName = async (name) => {
  const response = await api.get(`/staff_management/${name}`);

  return response.data;
};
