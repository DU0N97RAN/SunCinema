import AxiosRequest from "./instance";

export const SeatApi = {
  getAllSeats() {
    return AxiosRequest.get("/seats");
  },
  removeSeat(id?: any) {
    return AxiosRequest.delete(`seats/${id}`);
  },
  createSeat(data?: any) {
    return AxiosRequest.post("/seats", data);
  },
  updateSeat(input?: any) {
    return AxiosRequest.put(`/seatsByRoom/${input?.roomId}`, input);
  },
}
