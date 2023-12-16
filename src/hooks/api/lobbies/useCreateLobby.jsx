import {useMutation} from "@tanstack/react-query";
import useAxios from "../../useAxios";
import {createLobby} from "../../../lib/api/lobbies/index.js";

export const useCreateLobby = () => {
    const {axios} = useAxios();

    return useMutation({
        mutationFn: (data) => createLobby(data, axios)
        ,
        mutationKey: ["lobbies"],
    });
};