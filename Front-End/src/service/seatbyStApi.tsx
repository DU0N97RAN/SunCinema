import { AxiosRequestConfig } from "axios";
import axiosClient, { AxiosRequest } from "./instance";

export const seatByShowTime = {
  create(data: any): Promise<any> {
    return axiosClient.post("/seats", data);
  },

  getAll(options: AxiosRequestConfig = {}): Promise<any> {
    return AxiosRequest.get("/setByShowTime", options);
  },
  getOneByid(id: any): Promise<any> {
    const url = `seatsByRoom/${id}`;
    return axiosClient.get(url);
  },
  updateSeatByST(item: any) {
    return axiosClient.put(`/setByShowTime/${item._id}`, item);
  },
};
