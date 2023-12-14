import axios from "axios";

export const updateUser = (userId, data) => {
  return axios.put("http://localhost:8080/api/users/" + userId, data);
};
