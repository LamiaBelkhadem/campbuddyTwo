import useAxios from "../../useAxios.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampsiteFromFavorites } from "../../../lib/api/campsites/index.js";

export const useDeleteCampsiteFromFavorites = (campsiteId) => {
  const { axios } = useAxios();
  const client = useQueryClient();

  return useMutation({
    onSuccess: (data) => {
      client.invalidateQueries(["campsite", campsiteId]);
    },
    mutationFn: () => deleteCampsiteFromFavorites(campsiteId, axios),
  });
};
