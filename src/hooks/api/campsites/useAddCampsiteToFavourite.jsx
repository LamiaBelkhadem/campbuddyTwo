import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../useAxios.jsx";
import { addCampsiteToFavorites } from "../../../lib/api/campsites/index.js";

export const useAddCampsiteToFavourite = (campsiteId) => {
  const { axios } = useAxios();

  const client = useQueryClient();

  return useMutation({
    onSuccess: () => {
      client.invalidateQueries(["campsite", campsiteId]);
    },
    mutationFn: () => addCampsiteToFavorites(campsiteId, axios),
  });
};
