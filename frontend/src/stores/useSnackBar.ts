import { defineStore } from "pinia";
import SnackBar from '../composables/interfaces/snackBar/useSnackBarInterface'
import SnackBarForModification from '../composables/interfaces/snackBar/useSnackBarInterfaceForModification'



export const UseSnackBar = defineStore("UseSnackBarStore", {
  state: (): SnackBar => {
    return {
      snackbar: {
        visible: false,
        text: '',
        timeout: 6000,
        multiline: false,
        color: '',
        secondText: '',
      },
    };
  },
  getters: {
    getSnackBar: (state) => {
      return state.snackbar.visible;
    },
    getSnackBarText: (state) => {
      return state.snackbar.text;
    },
    getSnackBarSecondText: (state) => {
      return state.snackbar.secondText;
    },
  },
  actions: {
    updateState: function ($state: SnackBar, newState: SnackBarForModification) {
      const meregedState = {...$state.snackbar, ...newState.snackbar }
      Object.assign($state.snackbar, meregedState);
      this.$patch(state => state.snackbar = meregedState)
    },  
  },
  
});
