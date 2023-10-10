interface SnackBar {
  snackbar: {
    visible: boolean;
    text: String;
    timeout: Number;
    multiline: boolean;
    color: String;
    secondText?: String;
  };
}

export default SnackBar;
