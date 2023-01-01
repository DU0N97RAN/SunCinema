import AxiosRequest from "./instance";
export const TicketApi = {
  getAll() {
    return AxiosRequest.get("/tickets");
  },
  removeTiket(id?: any) {
    return AxiosRequest.delete(`tickets/${id}`);
  },
  updateTiket(data?: any) {
    return AxiosRequest.put(`/tickets/${data._id}`, data);
  },
  createTiket(data: any): Promise<any> {
    return AxiosRequest.post("/tickets", data);
  },
  getticketDetailById(input: any): Promise<any> {
    return AxiosRequest.get(`/tickets/getticketDetailById/${input}`);
  },
  // ticketPrice
  getAllTicketPrice() {
    return AxiosRequest.get("/ticketPrice");
  },
  removeTiketPrice(id?: any) {
    return AxiosRequest.delete(`ticketPrice/${id}`);
  },
  updateTiketPrice(data?: any) {
    return AxiosRequest.put(`/ticketPrice/${data._id}`, data);
  },
  createTiketPrice(data: any): Promise<any> {
    return AxiosRequest.post("/ticketPrice", data);
  },
};
