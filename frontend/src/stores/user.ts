import { defineStore } from "pinia";
import authService from "../composables/services/useAuthService";
import axios, { AxiosError } from "axios";
import userInterface from "../composables/interfaces/useUserInterface";

const user: userInterface | null = JSON.parse(
  localStorage.getItem("user") as string
);
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthUserStore = defineStore("AuthUserStore", {
  state: () => {
    return {
      initialState,
    };
  },
  getters: {
    userName: (state) => {
      if (state.initialState.user) {
        return state.initialState.user.userName;
      }
    },
    isLoggedIn: (state) => {
      return !!state.initialState.user;
    },
  },
  actions: {
    login: async (
      state: {
        initialState: {
          status: {
            loggedIn: boolean;
          };
          user: userInterface | null;
        };
      },
      loginData: { email: string; password: string }
    ) => {
      try {
        const response = await authService.login(loginData);
        const currentUser = JSON.parse(localStorage.getItem("user") as string);
        state.initialState = {
          status: { loggedIn: true },
          user: currentUser,
        };
        console.log(JSON.stringify(response));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            console.log(axiosError.response.data);
          }
        } else {
          console.log(error);
        }
      }
    },
    logOut() {
      console.log("ide bejön");
      authService.logout(); 
      const newState = {
        status: { loggedIn: false },
        user: null
      };
      this.updateState(this.$state, newState); 
    },
    updateState: (
      state: {
        initialState: {
          status: {
            loggedIn: boolean;
          };
          user: userInterface | null;
        };
      },
      newState: {
        status: {
          loggedIn: boolean;
        };
        user: userInterface | null;
      }
    ) => {
      state.initialState = newState;
    },
  },
});
