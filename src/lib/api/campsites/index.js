import axios from "axios";

export const getCampsites = () => {
  return axios
    .get("http://localhost:8080/api/campsites")
    .then((res) => res.data);
};
