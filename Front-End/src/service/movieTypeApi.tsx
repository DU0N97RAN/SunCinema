import { AxiosRequestConfig } from "axios";
import AxiosRequest from "./instance";

export const MovieTypeApi = {
  getAll() {
    return AxiosRequest.get("/movieType");
  },
  remove(id?: any) {
    return AxiosRequest.delete(`movieType/${id}`);
  },
  create(data?: any) {
    return AxiosRequest.post("/movieType", data);
  },
  edit(data: any) {
    return AxiosRequest.patch(`/movieType/${data._id}`, data);
  },
  getMovieTypeName(id: any) {
    return AxiosRequest.get(`/movieType/nameById/${id}`);
  },
};
