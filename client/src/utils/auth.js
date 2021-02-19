import axios from "axios";
import Cookies from "universal-cookie";

export const SignIn = (values) => {
  const cookies = new Cookies();
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/signIn`, {
      email: values.email,
      password: values.password,
    })
    .then((res) => {
      cookies.set("session_token", res.data.accessToken, { path: "/" });
    })
    .catch((err) => console.log(err));
};

export const SignUp = (values) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/signUp`, {
      email: values.email,
      password: values.password,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const checkAuth = () => {
  const cookies = new Cookies();
  const authToken = cookies.get("session_token");
  if (authToken) return true;
  else return false;
};
