import axios from "axios";

const API_URL = "http://localhost:8081/users/";

class AuthService {
  async login(user: { email: string; password: string }) {
    const response = await axios.post(API_URL + "login", {
      email: user.email,
      password: user.password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
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
