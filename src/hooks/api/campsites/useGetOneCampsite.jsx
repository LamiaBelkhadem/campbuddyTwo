import useAxios from "../../useAxios.jsx";
import { useQuery } from "@tanstack/react-query";
import { getOneCampsite } from "../../../lib/api/campsites/index.js";

export const useGetOneCampsite = (id) => {
  const { axios } = useAxios();

  return useQuery({
    queryKey: ["campsite", id],
    queryFn: () => getOneCampsite(id, axios),
    enabled: !!id,
  });
};
