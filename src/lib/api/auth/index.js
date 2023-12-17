import axios from "axios";
export const register = (user) =>
  axios.post(import.meta.env.VITE_API_URL + "/auth/register", user).then((resp) => resp.data);

export const login = async (credentials) =>
  axios.post(import.meta.env.VITE_API_URL+"/auth/login", credentials).then((res) => res.data);

export const verifyEmailApi = (token) => {
  return axios.get(import.meta.env.VITE_API_URL + `/auth/verify/${token}`).then((res) => res.data.user);
};
