import axios from "axios";

export const register = (user) => axios
    .post("http://localhost:8080/api/auth/register", user)
    .then((resp) => resp.data);
