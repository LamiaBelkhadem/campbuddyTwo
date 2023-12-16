import { useMutation } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { updateProfile } from "../../../lib/api/profile/index.js";

export const useUpdateProfile = () => {
  const { axios } = useAxios();
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: (data) => updateProfile(data, axios),
  });
};
