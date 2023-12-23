import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { addReview } from "../../../lib/api/profile/index.js";

export const useAddProfileReview = (id) => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["profile", id],
    mutationFn: (data) => addReview(data, id, axios),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", id]);
    },
  });
};
