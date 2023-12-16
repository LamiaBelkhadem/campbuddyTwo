import { useEffect, useState } from "react";
import axios from "axios";

export const useUserInfo = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchUser = async (accessToken) => {
    try {
      const user = await axios
        .get(`${import.meta.env.VITE_API_URL}/auth/me`, {
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
    }
  };

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return {
    isLoading,
    error,
    fetchData: fetchUser,
    data,
  };
};
