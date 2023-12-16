export const register = (user, client) =>
  client.post("/auth/register", user).then((resp) => resp.data);

export const login = async (credentials, client) =>
  client.post("/auth/login", credentials).then((res) => res.data);

export const verifyEmailApi = (token, client) => {
  return client.get(`/auth/verify/${token}`).then((res) => res.data.user);
};
