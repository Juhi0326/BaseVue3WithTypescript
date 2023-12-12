import { defineStore } from "pinia";
import authService from "../composables/services/useAuthService";
import axios, { AxiosError } from "axios";
import userInterface from "../composables/interfaces/useUserInterface";

interface StateParamInterface {
    initialState: {
      status: {
        loggedIn: boolean;
      };
      user: userInterface | null;
    }
}

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
    userImage: (state) => {
      if (state.initialState.user && state.initialState.user.userImage) {
        const userImage = "http://localhost:8081/" + state.initialState.user.userImage
        return userImage
        ;
      }
    },
    userRole: (state) => {
      if (state.initialState.user) {
        return state.initialState.user.role;
      }
    },
    userId: (state) => {
      if (state.initialState.user) {
        return state.initialState.user.userId
      }
    },
    userMonogram: (state) => {
      let monogram = ''
      if (state.initialState.user) {
        const partOfName = state.initialState.user.userName.split(' ');
        for (let i = 0; i < partOfName.length; i++) {
          // Az aktuális névrész első karakterét hozzáadjuk a monogramhoz
          monogram += partOfName[i][0].toUpperCase();
        }
      }
      return monogram
    },
    
    isLoggedIn: (state) => {
      return !!state.initialState.user;
    },
  },

  
  actions: {
    login: async (
      state: StateParamInterface,
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
      state: StateParamInterface,
      newState: {
        status: {
          loggedIn: boolean;
        };
        user: userInterface | null;
      }
    ) => {
      console.log('ez a new state, ami beérkezik: ' + JSON.stringify(newState))
      console.log('és amúgy ez a state.initialState, ami beérkezik: ' + JSON.stringify(state.initialState))
      state.initialState = newState;
    },    
  },
});
