import api from "@/API/axios";

// Customer
export const requestService = async (service_id, note) => {
  const response = await api.post("/request_service/", {
    service_id,
    note,
  });

  return response.data;
};

// Admin
export const getAllRequests = async () => {
  const response = await api.get("/request_service/all");

  return response.data;
};

export const getRequestById = async (request_id) => {
  const response = await api.get(`/request_service/${request_id}`);

  return response.data;
};

export const approveRequest = async (request_id) => {
  const response = await api.patch(
    `/request_service/approve/${request_id}`
  );

  return response.data;
};

export const rejectRequest = async (request_id) => {
  const response = await api.patch(
    `/request_service/reject/${request_id}`
  );

  return response.data;
};

export const assignRequestToStaff = async (request_id, staff_id) => {
  const response = await api.patch(
    `/request_service/assign/${request_id}`,
    {
      staff_id,
    }
  );

  return response.data;
};

// Staff
export const myAssignedRequests = async () => {
  const response = await api.get(
    "/request_service/staff/my"
  );

  return response.data;
};

export const startRequest = async (request_id) => {
  const response = await api.patch(
    `/request_service/staff/start/${request_id}`
  );

  return response.data;
};

export const completeRequest = async (request_id) => {
  const response = await api.patch(
    `/request_service/staff/complete/${request_id}`
  );

  return response.data;
};
