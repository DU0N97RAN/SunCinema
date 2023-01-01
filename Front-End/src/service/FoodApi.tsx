import AxiosRequest from "./instance";

export const FoodApi = {
  getAll() {
    return AxiosRequest.get("/food");
  },
  remove(id?: any) {
    return AxiosRequest.delete(`food/${id}`);
  },
  create(data?: any) {
    return AxiosRequest.post("/food",data);
  },
  edit(data: any) {
    return AxiosRequest.patch(`/food/${data._id}`, data);
  },
  getOne(slug: any) {
    return AxiosRequest.get(`/foods/${slug}`);
  },
  search(key: any) {
    return AxiosRequest.get(`/searchByFoodName?q=${key}`);
  },
};
