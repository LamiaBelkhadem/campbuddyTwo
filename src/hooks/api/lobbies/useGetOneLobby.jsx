import { useQuery } from "@tanstack/react-query";
import { getOneLobby } from "../../../lib/api/lobbies/index.js";
import useAxios from "../../useAxios.jsx";

export const useGetOneLobby = (lobbyId) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: ["lobbies", lobbyId],
    queryFn: async () => getOneLobby(lobbyId, axios),
  });
};
