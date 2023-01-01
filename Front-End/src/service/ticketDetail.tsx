// getTicketDetailByShowTime
import AxiosRequest from "./instance";
export const TicketDetailApi = {
  getAll() {
    return AxiosRequest.get("/ticketDetail");
  },
  removeTiketDetail(id?: any) {
    return AxiosRequest.delete(`ticketDetail/${id}`);
  },
  updateTiketDetail(data?: any) {
    return AxiosRequest.put(`/ticketDetail/${data._id}`, data);
  },
  createTiketDetail(data: any): Promise<any> {
    return AxiosRequest.post("/ticketDetail", data);
  },
  getTicketDetailByShowTime(data: any) {
    return AxiosRequest.get(
      `/getTicketDetailByShowTime?showTimeId=${data.idShowTime}&roomId=${data.idRoom}`
    );
  },
};
