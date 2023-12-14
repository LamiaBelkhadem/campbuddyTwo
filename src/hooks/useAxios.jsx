import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const useAxios = () => {
  const { accessToken, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      // eslint-disable-next-line no-undef
      baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
    });

    instance.interceptors.response.use(null, async (response) => {
      // Unauthorized
      if (response.response.status === 401) {
        navigate("/");
      }
      return Promise.reject(response);
    });

    instance.interceptors.request.use((config) => {
      if (!isLoggingIn && accessToken) {
        config.headers.set({
          Authorization: `Bearer ${accessToken}`,
        });
      }
      return config;
    });

    return instance;
  }, [accessToken, isLoggingIn]);

  return { axios: axiosInstance, loading: isLoggingIn };
};

export default useAxios;
