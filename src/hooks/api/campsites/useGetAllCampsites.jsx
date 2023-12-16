import useAxios from "../../useAxios.jsx";
import {useQuery} from "@tanstack/react-query";
import {getAllCampsites} from "../../../lib/api/campsites/index.js";

export const useGetAllCampsites = () => {

    const {axios} = useAxios()
    return useQuery({
        queryKey: ['campsites'],
        queryFn: () => getAllCampsites(axios)
    })

}