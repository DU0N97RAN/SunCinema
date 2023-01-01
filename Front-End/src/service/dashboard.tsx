import AxiosRequest from "./instance";

export const DashBoard = {
  async getAll() {
    return AxiosRequest.get("/dashboard");
  },
};
