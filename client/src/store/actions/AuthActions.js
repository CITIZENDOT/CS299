import * as actionTypes from "./actionTypes";
import { authLoader, pageLoader } from "./Loaders";
import axios from "axios";
import Cookies from "universal-cookie";

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(authLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/signIn`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const cookies = new Cookies();
        cookies.set("session_token", res.data.accessToken, { path: "/" });
        dispatch({
          type: actionTypes.AUTH,
          isAuthenticated: true,
          email: res.data.email,
          accessToken: res.data.accessToken,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH,
          isAuthenticated: false,
          alertMessage: err.response.data.message,
          alertType: "error",
          alertFor: "SIGNIN",
        });
      });
  };
};

export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch(authLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/signIn`, {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.AUTH,
          alertMessage: res.data.message,
          alertType: "success",
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH,
          isAuthenticated: false,
          alertMessage: err.response.data.message,
          alertType: "danger",
          alertFor: "SIGNUP",
        });
      });
  };
};

export const checkAuth = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("session_token");
  console.log("AccessToken: ", accessToken);
  return (dispatch, getState) => {
    dispatch(pageLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/checkAuth`, {
        accessToken: accessToken,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.AUTH,
          isAuthenticated: true,
          isPageLoading: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH,
          isAuthenticated: false,
          isPageLoading: false,
        });
      });
  };
};

export const signOut = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("session_token");
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/logout`, {
        accessToken: accessToken,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.AUTH,
          isAuthenticated: false,
          isPageLoading: false,
        });
        cookies.remove("session_token");
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH,
          isPageLoading: false,
        });
      });
  };
};
