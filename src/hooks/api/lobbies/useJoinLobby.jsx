import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinLobby } from "../../../lib/api/lobbies/index.js";
import useAxios from "../../useAxios.jsx";

export const useJoinLobby = (lobbyId) => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["lobbies", lobbyId],
    mutationFn: async () => joinLobby(lobbyId, axios),
    onSuccess: () => {
      queryClient.invalidateQueries(["lobbies"]);
    },
  });
};
