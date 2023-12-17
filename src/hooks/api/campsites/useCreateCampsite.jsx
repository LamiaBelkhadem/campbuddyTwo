import useAxios from "../../useAxios.jsx";
import { createCampsite } from "../../../lib/api/campsites/index.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCampsite = () => {
  const { axios } = useAxios();
  const { invalidateQueries } = useQueryClient();

  return useMutation({
    mutationFn: (values) => createCampsite(values, axios),
    onSuccess: () => {
      invalidateQueries(["campsites"]);
    },
  });
};
