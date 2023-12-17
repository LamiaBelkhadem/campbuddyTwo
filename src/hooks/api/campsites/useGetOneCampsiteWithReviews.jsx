import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios.jsx";
import { getOneCampsiteWithReviews } from "../../../lib/api/campsites/index.js";

export const useGetOneCampsiteWithReviews = (id) => {
  const { axios } = useAxios();

  return useQuery({
    queryKey: ["campsite", id],
    queryFn: () => getOneCampsiteWithReviews(id, axios),
    enabled: !!id,
  });
};
