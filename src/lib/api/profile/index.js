export const updateProfile = (data, client) =>
  client.post("/profiles", data).then((res) => res.data);
export const viewUserProfile = (id, client) =>
  client.get(`/profiles/${id}`).then((res) => res.data);
export const getProfiles = (client) =>
  client.get("/profiles").then((res) => res.data);
export const getMyProfile = (client) =>
  client.get("/profiles/my-profile").then((res) => res.data.profile);
export const deleteProfile = (id, client) =>
  client.delete(`/profiles/${id}`).then((res) => res.data);
export const viewProfile = (id, client) =>
  client.get(`/profiles/view/${id}`).then((res) => res.data.profile);
export const addReview = (data, id, client) =>
  client.post(`/profiles/${id}/review`, data).then(res => res.data)
export const getProfileReviews = (id, client) =>
  client.get(`/profiles/${id}/review`).then(res => res.data.reviews)
export const deleteReview = (id, client) =>
  client.delete(`/profiles/${id}/review`).then(res => res.data)