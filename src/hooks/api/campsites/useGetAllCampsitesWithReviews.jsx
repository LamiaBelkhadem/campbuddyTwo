import useAxios from "../../useAxios.jsx";

export const useGetAllCampsitesWithReviews = () => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: ["campsites"],
    queryFn: () => getAllCampsitesWithReviews(axios),
  });
};
