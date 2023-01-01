import axiosClient from "./instance";

export const orderApi = {
  getAllOrder() {
    let url = "/order";
    return axiosClient.get(url);
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/order", data);
  },
  createPayment(data:any): Promise<any> {
    return axiosClient.post("/order/createPaymentUrl", data);
  },
  getOne(data:any): Promise<any> {
    return axiosClient.get(`/order/${data}`);
  },
  getByShortId(input:any): Promise<any> {
    return axiosClient.get(`/orderByShortId?shortId=${input}`);
  },
  updateOrder(input:any): Promise<any> {
    return axiosClient.get(`/order/${input?._id}`);
  },
  getDashBoardData() {
    let url = "/dashboard";
    return axiosClient.get(url);
  },
  exportOrderTicket(input:any) {
    return axiosClient.get(`/ticket-export/${input}`);
  }
};
