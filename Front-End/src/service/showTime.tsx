
import { AxiosRequestConfig } from "axios";
import axiosClient, { AxiosRequest } from "./instance";


export const showTimetApi = {
  getAll(options: AxiosRequestConfig = {}): Promise<any> {
    return AxiosRequest.get("/showTime", options);
  },
  removeApi(data?: string) {
    let url = `showTime/${data}`
    return axiosClient.delete(url);
  },
  updateApi(payload: any) {
    const url = `/showTime/${payload._id}`
    return axiosClient.put(url, payload)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/showTime", data);
  },
  //seatOnShowTime
  getOneByid(data:any):Promise<any> {
    const url = `setByShowTime/${data?._id}`;
    return axiosClient.get(url)
  }
};