import axios, { AxiosError } from "axios";
import authHeader from "../useAuthHeader";

const API_URL = "http://localhost:8081/users/";

class UserService {
  
    changeMyDataById(id: string, payload: any) {
        try {
            return axios.patch(API_URL + '/' + id , payload, { headers: authHeader() } )
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                  const errorMessage = axiosError.response.data as string;
                  throw new Error(errorMessage)
                }
              } else {
                console.log(error);
              }
        }
      }
      getUserById(userId: string) {
        console.log(API_URL + '/' + userId)
        try {
            return axios.get(API_URL + '/' + userId, { headers: authHeader() });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                  const errorMessage = axiosError.response.data as string;
                  throw new Error(errorMessage)
                }
              } else {
                console.log(error);
              }
        }
    }
  
}

export default new UserService();
