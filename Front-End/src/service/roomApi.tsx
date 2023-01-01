
import axiosClient from "./instance";


export const roomApi = {
  getAll(){
    let url = "/rooms";
    return axiosClient.get(url);
  },
  removeApi(data?: string) {
    let url = `rooms/${data}`
    return axiosClient.delete(url);
  },
  updateApi(payload: any) {
    const url = `/rooms/${payload._id}`
    return axiosClient.put(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/rooms", data);
  }
};
