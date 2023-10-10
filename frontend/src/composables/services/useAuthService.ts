import axios from "axios";
import loginInterface from '../interfaces/useLoginInterface';

const API_URL = "http://localhost:8081/users/";

class AuthService {
  async login(user: loginInterface) {
    try {
      const response = await axios.post(API_URL + "login", {
        email: user.email,
        password: user.password
      });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log('és ez nem fut le, ha rossz')
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message || 'Unknown error';
      console.log('ide dobódik')
      throw new Error(errorMessage);
    }
  }

  logout() {
    localStorage.removeItem("user");
    //localStorage.removeItem("cartItems");
  }

  registerForm(user: any) {
    return axios.post(API_URL + "signup2", user);
  }

  async sendResetPasswordEmail(email: string) {
    try {
      const response = await axios.post(API_URL + "reset-password", { email });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error", error);
      throw error;
    }
  }

  async receiveNewPassword(id: string, token: string, password: string) {
    try {
      const response = await axios.post(
        `${API_URL}receive_new_password/${id}/${token}`,
        password
      );
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error", error);
      throw error;
    }
  }
}

export default new AuthService();
