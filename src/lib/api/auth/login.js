export const login = async ( client) =>
  (creds)=>client.post("/auth/login", creds).then((res) => res.data);
