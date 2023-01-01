import AxiosRequest from "./instance";

export const Comenter = {
  getAll() {
    return AxiosRequest.get("/comment");
  },
  remove(id?: any) {
    return AxiosRequest.delete(`comment/${id}`);
  },
  updateStatus(id?: any, data?: any) {
    return AxiosRequest.put(`comment/${id}`, data);
  },
  create(data?: any) {
    return AxiosRequest.post("/comment", data);
  },
  listByMovies(id: string) {
    return AxiosRequest.get(`/comments?movieId=${id}`);
  },
  getOne(slug: any) {
    return AxiosRequest.get(`/comment/${slug}`);
  },
};
