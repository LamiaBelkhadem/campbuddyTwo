import useAxios from "../../useAxios";
import { useQuery } from "@tanstack/react-query";
import { getAllLobbies } from "../../../lib/api/lobbies/index.js";

export const useAllLobbies = () => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: ["lobbies"],
    queryFn: () => getAllLobbies(axios),
  });
};
