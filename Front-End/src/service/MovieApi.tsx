import AxiosRequest from "./instance";

export const MovieApi = {
  getAll() {
    return AxiosRequest.get("/movie");
  },
  remove(id?: any) {
    return AxiosRequest.delete(`movie/${id}`);
  },
  create(data?: any) {
    return AxiosRequest.post("/movie", data);
  },
  edit(data: any) {
    return AxiosRequest.patch(`/movie/${data._id}`, data);
  },
  getOne(slug: any) {
    return AxiosRequest.get(`/movies/${slug}`);
  },
  search(key: any) {
    return AxiosRequest.get(`/searchByMovieName?q=${key}`);
  },
};
