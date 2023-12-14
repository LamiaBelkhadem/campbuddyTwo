import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../useAxios";

export const useLogin = () => {
  const { axios } = useAxios();
  return useMutation({
    mutationFn: async (data) =>
      axios.post("/auth/login", data).then((res) => res.data),
  });
};
