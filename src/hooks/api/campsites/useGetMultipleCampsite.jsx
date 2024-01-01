import useAxios from "../../useAxios.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMultipleCampsites } from "../../../lib/api/campsites/index.js";

export const useGetMultipleCampsite = (ids) => {
  const { axios } = useAxios();

  return useQuery({
    queryKey: ['campsites', { ids }],
    queryFn: () => getMultipleCampsites(ids, axios),
    enabled: !!ids && ids.length > 0,
  });
};
