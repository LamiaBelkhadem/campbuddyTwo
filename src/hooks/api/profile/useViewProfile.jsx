import useAxios from "../../useAxios.jsx";
import { useQuery } from "@tanstack/react-query";
import { viewProfile } from "../../../lib/api/profile";

export const useViewProfile = (id) => {
  const { axios } = useAxios();
  return useQuery({
    queryFn: () => viewProfile(id, axios),
    queryKey: ["profile", id],
  });
};
