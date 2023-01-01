import AxiosRequest from "./instance";

export const SliderApi = {
  getAll() {
    return AxiosRequest.get("/slider");
  },
  remove(id?: any) {
    return AxiosRequest.delete(`slider/${id}`);
  },
  create(data?: any) {
    return AxiosRequest.post("/slider", data);
  },
  edit(data: any) {
    return AxiosRequest.patch(`/slider/${data._id}`, data);
  },
  getOne(slug: any) {
    return AxiosRequest.get(`/slider/${slug}`);
  },
  search(key: any) {
    return AxiosRequest.get(`/searchBySliderName?q=${key}`);
  },
};
