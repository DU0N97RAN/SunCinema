
import axiosClient from "./instance";


export const webConfigApi = {
  getAll(){
    let url = "/config";
    return axiosClient.get(url);
  },
  updateApi(payload: any) {
    const url = `/config/${payload._id}`
    return axiosClient.put(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/config", data);
  }
};