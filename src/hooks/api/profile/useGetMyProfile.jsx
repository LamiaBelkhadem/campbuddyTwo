import useAxios from "../../useAxios.jsx";
import {useQuery} from "@tanstack/react-query";
import {getMyProfile} from "../../../lib/api/profile/index.js";

export const useGetMyProfile = () => {
    const {axios} = useAxios();
    return useQuery({
        queryFn: () => getMyProfile(axios),
        queryKey: ['user', 'profile']
    })
}