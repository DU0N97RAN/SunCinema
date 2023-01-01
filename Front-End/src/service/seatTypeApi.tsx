import AxiosRequest from "./instance";

export const SeatTypeApi = {
  getAll() {
    return AxiosRequest.get("/seatType");
  },
  removeSeatType(id?: any) {
    return AxiosRequest.delete(`seatType/${id}`);
  },
  createSeatType(data?: any) {
    return AxiosRequest.post("/seatType", data);
  },
  updateSeatType(data?: any) {
    return AxiosRequest.patch(`/seatType/${data?._id}`, data);
  },
};
