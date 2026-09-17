import api from "@/API/axios";

export const updateProfile = async (profileDate) => {
  const response = await api.patch("/updateProfile/me", profileDate);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.patch(
    "/updateProfile/change-password",
    passwordData,
  );
  return response.data;
};
