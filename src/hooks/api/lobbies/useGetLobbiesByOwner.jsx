
import useAxios from "../../useAxios";
import { useQuery } from "@tanstack/react-query";
import { getLobbyByOwner } from "../../../lib/api/lobbies/index.js";

export const useGetLobbiesByOwner = (userId) => {
    const { axios } = useAxios();
    return useQuery({
        queryKey: ["lobbies","user", userId],
        queryFn: () => getLobbyByOwner(userId, axios),
    });
};
