import axios from "axios";
export const verifyEmailApi = (token) => {
  return axios
    .get(`http://localhost:8080/api/auth/verify/${token}`)
    .then((res) => res.data.user);
};
