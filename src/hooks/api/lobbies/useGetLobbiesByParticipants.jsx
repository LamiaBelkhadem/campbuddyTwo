
import useAxios from "../../useAxios";
import { useQuery } from "@tanstack/react-query";
import { getLobbyByParticipants } from "../../../lib/api/lobbies/index.js";

export const useGetLobbiesByParticipants = (userId) => {
    const { axios } = useAxios();
    return useQuery({
        queryKey: ["lobbiesByParticipant", userId],
        queryFn: () => getLobbyByParticipants(userId, axios),
    });
};
