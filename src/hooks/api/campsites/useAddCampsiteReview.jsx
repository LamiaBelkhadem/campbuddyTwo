import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../useAxios.jsx";
import { toast } from "react-toastify";
import { addCampsiteReview } from "../../../lib/api/campsites/index.js";

export const useAddCampsiteReview = (campsiteId) => {
  const { axios } = useAxios();
  const client = useQueryClient();
  return useMutation({
    mutationFn: (review) => addCampsiteReview(review, campsiteId, axios),
    onSuccess: () => {
      client.invalidateQueries(["campsite", campsiteId]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });
};
