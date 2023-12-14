import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";

export const useUserInfo = () => {
  const { axios } = useAxios();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchUser = async (accessToken) => {
    setLoading(true);
    try {
      const user = await axios
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data);

      setData(user);
      return user;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchData: fetchUser,
    data,
  };
};
