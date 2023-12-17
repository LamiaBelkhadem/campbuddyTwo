import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { removeCampsiteFromFavorites } from "../../../lib/api/campsites";

export const useRemoveCampsiteFromFavorites = (campsiteId) => {
  const { axios } = useAxios();
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => removeCampsiteFromFavorites(campsiteId, axios),
    onSuccess: () => {
      client.invalidateQueries(["campsite", campsiteId]);
    },
  });
};
