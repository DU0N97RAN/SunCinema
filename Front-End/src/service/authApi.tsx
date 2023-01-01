
import axiosClient from "./instance";
import AxiosRequest from "./instance";


export const AuthApi = {
  async register(data: any): Promise<any> {
    return AxiosRequest.post("/register", data);
  },
  async login(data: any): Promise<any> {
    return AxiosRequest.post("/login", data);
  },
  async createOrUpdateUser(authtoken: string, data: any): Promise<any> {
    const url = "userVerify"
    return AxiosRequest.put(url, data,
      {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
        },
      },
    );
  },
  async forgotPassword(data: any): Promise<any> {
    const url = "users_forgot_password"
    return AxiosRequest.post(url, data);
  },
  async getCurrentUser(): Promise<any> {
    const url = "current_user"
    return AxiosRequest.get(url, {
      withCredentials: true,    // IMPORTANT!!!
    }
    );
  },
};
