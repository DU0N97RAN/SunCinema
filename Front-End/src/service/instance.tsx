import axios from "axios";
import { auth } from "../firebase";

let accessToken;
try {
  const root = JSON.parse(localStorage.getItem("persist:root") || "");
  const user = JSON.parse(root.authReducer);
  if (user) accessToken = user.accessToken;
} catch (error) {
  console.log(error);
}

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_ONLINE}/`,
  timeout: 90000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const AxiosRequest = {
  post(path: string, data: {}, options = {}): Promise<any> {
    return axiosClient.post(path, data, options);
  },
  get(path: string, options = {}): Promise<any> {
    return axiosClient.get(path, options);
  },
  put(path: string, data: {}, options = {}): Promise<any> {
    return axiosClient.put(path, data, options);
  },
  delete(path: string, options = {}): Promise<any> {
    return axiosClient.delete(path, options);
  },
};
export default axiosClient;
