import { updateCampsite } from "../../../lib/api/campsites/index.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../useAxios.jsx";

export const useUpdateCampsite = () => {
  const { axios } = useAxios();
  const { invalidateQueries } = useQueryClient();

  return useMutation({
    mutationFn: (values) => updateCampsite(values, axios),
    onSuccess: () => {
      invalidateQueries(["campsites"]);
    },
  });
};
