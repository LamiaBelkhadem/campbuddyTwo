import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi } from "../../lib/api/auth";

export const useVerifyEmail = (token) => {
  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: () => verifyEmailApi(token),
    retry: false,
  });
};
