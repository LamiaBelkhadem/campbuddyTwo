import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) =>
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/login`, data)
        .then((res) => res.data),
  });
};
