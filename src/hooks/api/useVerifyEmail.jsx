import { useQuery } from "@tanstack/react-query";
import { verifyEmailApi } from "../../lib/api/auth";

export const useVerifyEmail = (token) => {
  return useQuery({
    queryKey: ["verify-email"],
    queryFn: () => verifyEmailApi(token),
    enabled: !!token,
    retry: false,
  });
};

/**
 * Caching mechanism
 * verify-email
 */
