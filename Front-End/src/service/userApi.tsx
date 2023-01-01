import axiosClient, { AxiosRequest } from "./instance";

export const UserApi = {
  getAll() {
    let url = "/users";
    return axiosClient.get(url);
  },
  removeUser(userID?: string) {
    let url = `users/${userID}`
    return axiosClient.delete(url);
  },
  updateUser( data: any) {
    const url = `/users/${data._id}`
    return axiosClient.put(url, data)
  },
  create(data: any): Promise<any> {
    return axiosClient.post("/register", data);
  },
   updatePassword( data: any): Promise<any> {
    const url = `/users_password_update`
    return AxiosRequest.put(url, data,
      {
        headers: {
          "Authorization": `Bearer ${data.token}`,
        },
      },
    );
  },
};
