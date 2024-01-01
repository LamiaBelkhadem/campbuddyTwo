// hooks/api/lobbies/useRecommendedLobbies.js
import useAxios from "../../useAxios";
import { useQuery } from "@tanstack/react-query";

export const useRecommendedLobbies = () => {
  const { axios } = useAxios();

  return useQuery({
    queryKey: ["recommendedLobbies"],
    queryFn: () => axios.get("/recommend/lobby").then((res) => res.data.lobbies),
    enabled: true, 
  });
};
