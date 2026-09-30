import api from "@/API/axios";

export const createTourSchedule = async (tour_id, scheduleData) => {
  const response = await api.post(`tour_schedules/${tour_id}`, scheduleData);
  return response.data;
};

export const getAllTourSchedules = async () => {
  const response = await api.get("tour_schedules/");
  return response.data;
};

export const getTourScheduleByTour = async (tour_id) => {
  const response = await api.get(`tour_schedules/tour/${tour_id}`);
  return response.data;
};

export const getTourScheduleById = async (schedule_id) => {
  const response = await api.get(`tour_schedules/${schedule_id}`);
  return response.data;
};

export const updateTourSchedule = async (schedule_id) => {
  const response = await api.patch(`tour_schedule/${schedule_id}`);
  return response.data;
};

export const changeScheduleStatus = async (schedule_id) => {
  const response = await api.patch(`tour_schedule/${schedule_id}/status`);
  return response.data;
};
