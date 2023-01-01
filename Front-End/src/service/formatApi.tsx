
import axiosClient from "./instance";


export const filmFormatApi = {
  getAll(){
    let url = "/filmFormat";
    return axiosClient.get(url);
  },
  removeApi(data?: string) {
    let url = `filmFormat/${data}`
    return axiosClient.delete(url);
  },
  updateApi(payload: any) {
    const url = `/filmFormat/${payload._id}`
    return axiosClient.patch(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/filmFormat", data);
  }
};