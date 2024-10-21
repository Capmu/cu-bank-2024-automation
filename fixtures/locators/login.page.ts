import { error } from "console";

export const loginPageLocators = {
  textboxs: {
    usernameInput: "#accountId",
    passwordInput: "#password",
  },
  buttons: {
    loginButton: "[cid='lc']",
  },

  label: {
    errorMsgLabel: "[cid='login-error-mes']",
  },
};
