import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveLobby } from "../../../lib/api/lobbies/index.js";
import useAxios from "../../useAxios.jsx";

export const useLeaveLobby = (lobbyId) => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["lobbies", lobbyId],
    mutationFn: async () => leaveLobby(lobbyId, axios),
    onSuccess: () => {
      queryClient.invalidateQueries(["lobbies", lobbyId]);
    },
  });
};
