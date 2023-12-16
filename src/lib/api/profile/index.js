export const updateProfile = (data, client) =>
  client.post("/profiles", data).then((res) => res.data);
export const viewUserProfile = (id, client) =>
  client.get(`/profiles/${id}`).then((res) => res.data);
export const getProfiles = (client) =>
  client.get("/profiles").then((res) => res.data);
export const getMyProfile = (client) =>
  client.get("/profiles/my-profile").then((res) => res.data);
export const deleteProfile = (id, client) =>
  client.delete(`/profiles/${id}`).then((res) => res.data);
