import useAxios from "../../useAxios.jsx";
import { createCampsite } from "../../../lib/api/campsites/index.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateCampsite = () => {
  const { axios } = useAxios();
  const { invalidateQueries } = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: "campsite",
    mutationFn: (values) => createCampsite(values, axios),
    onSuccess: () => {
      invalidateQueries(["campsites"]);
      navigate("/app/admin");
    },
  });
};
