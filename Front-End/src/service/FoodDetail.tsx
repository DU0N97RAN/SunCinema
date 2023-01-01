
import AxiosRequest from "./instance";

export const foodDetailApi = {
  createFoodDetail(data: any): Promise<any> {
    return AxiosRequest.post("/foodDetail", data);
  },

};