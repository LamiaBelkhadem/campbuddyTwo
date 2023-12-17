import { uploadCampsiteImage } from "../../../lib/api/campsites/index.js";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../useAxios.jsx";

export const useUploadCampsiteImage = () => {
  const { axios } = useAxios();

  return useMutation({
    mutationFn: (file) => uploadCampsiteImage(file, axios),
    onSuccess: (data) => {
      toast.success("Image uploaded successfully");
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });
};
