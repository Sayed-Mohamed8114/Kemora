import api from "@/API/axios";

export const usersStatistics = async () => {
  const response = await api.get("/admin_dashboard/users");
  return response.data;
};

export const servicesStatistics = async () => {
  const response = await api.get("/admin_dashboard/services");
  return response.data;
};


