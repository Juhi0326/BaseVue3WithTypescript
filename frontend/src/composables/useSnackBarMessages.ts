import { UseSnackBar } from '../stores/useSnackBar';
const useSnackBar = UseSnackBar();

export function setSnackBarMessage (successMessage: boolean, message: string) :void {
    if (successMessage) {
        useSnackBar.updateState(useSnackBar.$state, { snackbar: {
            visible: true,
            text: message,
            color: 'success',
        }})
    } else {
        useSnackBar.updateState(useSnackBar.$state, { snackbar: {
            visible: true,
            text: message,
            color: 'error',
        }})
    }
}