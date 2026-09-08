import api from "@/API/axios";

export const createContactInquiry = async (formData) => {
  const response = await api.post("/api/contact-inquiries", formData);
  return response.data;
};
