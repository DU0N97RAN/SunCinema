
import axiosClient from "./instance";


export const voucherApi = {
  getAll(){
    let url = "/voucher";
    return axiosClient.get(url);
  },
  removeApi(data?: string) {
    let url = `voucher/${data}`
    return axiosClient.delete(url);
  },
  updateApi(payload: any) {
    const url = `/voucher/${payload._id}`
    return axiosClient.patch(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/voucher", data);
  }
};