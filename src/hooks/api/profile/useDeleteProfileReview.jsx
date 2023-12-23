import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { deleteReview } from "../../../lib/api/profile/index.js";

export const useDeleteProfileReview = (id) => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["profile", id],
    mutationFn: () => deleteReview(id, axios),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", id]);
    },
  });
};
