import axios, { AxiosError } from "axios";
import loginInterface from '../interfaces/useLoginInterface';
import userInterface from '../interfaces/useUserInterface'
import { useAuthUserStore } from '../../stores/user';
import { Store, PiniaCustomStateProperties } from "pinia";

const API_URL = "http://localhost:8081/users/";
let authUserStore: Store<"AuthUserStore", { initialState: { status: { loggedIn: boolean; }; user: userInterface; } | { status: { loggedIn: boolean; }; user: null; }; }, { userName: (state: { initialState: { status: { loggedIn: boolean; }; user: { email: string; password: string; resetLink?: string | undefined; role: string; userName: string; cart?: Object[] | undefined; userImage?: string | undefined; accessToken: string; }; } | { status: { loggedIn: boolean; }; user: null; }; } & PiniaCustomStateProperties<{ initialState: { status: { loggedIn: boolean; }; user: userInterface; } | { status: { loggedIn: boolean; }; user: null; }; }>) => string | undefined; userImage: (state: { initialState: { status: { loggedIn: boolean; }; user: { email: string; password: string; resetLink?: string | undefined; role: string; userName: string; cart?: Object[] | undefined; userImage?: string | undefined; accessToken: string; }; } | { status: { loggedIn: boolean; }; user: null; }; } & PiniaCustomStateProperties<{ initialState: { status: { loggedIn: boolean; }; user: userInterface; } | { status: { loggedIn: boolean; }; user: null; }; }>) => string | undefined; userRole: (state: { initialState: { status: { loggedIn: boolean; }; user: { email: string; password: string; resetLink?: string | undefined; role: string; userName: string; cart?: Object[] | undefined; userImage?: string | undefined; accessToken: string; }; } | { status: { loggedIn: boolean; }; user: null; }; } & PiniaCustomStateProperties<{ initialState: { status: { loggedIn: boolean; }; user: userInterface; } | { status: { loggedIn: boolean; }; user: null; }; }>) => string | undefined; userMonogram: (state: { initialState: { status: { loggedIn: boolean; }; user: { email: string; password: string; resetLink?: string | undefined; role: string; userName: string; cart?: Object[] | undefined; userImage?: string | undefined; accessToken: string; }; } | { status: { loggedIn: boolean; }; user: null; }; } & PiniaCustomStateProperties<{ initialState: { status: { loggedIn: boolean; }; user: userInterface; } | { status: { loggedIn: boolean; }; user: null; }; }>) => string; isLoggedIn: (state: { initialState: { status: { loggedIn: boolean; }; user: { email: string; password: string; resetLink?: string | undefined; role: string; userName: string; cart?: Object[] | undefined; userImage?: string | undefined; accessToken: string; }; } | { status: { loggedIn: boolean; }; user: null; }; } & PiniaCustomStateProperties<{ initialState: { status: { loggedIn: boolean; }; user: userInterface; } | { status: { loggedIn: boolean; }; user: null; }; }>) => boolean; }, { login: (state: { initialState: { status: { loggedIn: boolean; }; user: userInterface | null; }; }, loginData: { email: string; password: string; }) => Promise<void>; logOut(): void; updateState: (state: { initialState: { status: { loggedIn: boolean; }; user: userInterface | null; }; }, newState: { status: { loggedIn: boolean; }; user: userInterface | null; }) => void; }> | undefined = undefined

class AuthService {
  init() {
    authUserStore = useAuthUserStore();
  }
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
  getUser() :userInterface | null {
    if (authUserStore) {
      return authUserStore.$state.initialState.user  
    } else {
      return null
    }
        
  }
}

export default new AuthService();
