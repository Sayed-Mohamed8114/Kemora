import api from "@/API/axios"

export const createTourSchedule = async (tour_id , scheduleData) => {
    const response = await api.post(`/tour_schedules/${tour_id}`,scheduleData);
    return response.data;
}

