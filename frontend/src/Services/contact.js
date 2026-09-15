import api from "@/API/axios";

export const createContactInquiry = async (formData) => {
  const response = await api.post("/api/contact-inquiries", formData);
  return response.data;
};

export const getAllInquiries = async () => {
  const response = await api.get("/api/contact-inquiries");
  return response.data;
};

export const deleteInquiry = async (inquiry_id) => {
  const response = await api.delete(`/api/contact-inquiries/${inquiry_id}`);
  return response.data;
};
