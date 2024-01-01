export const getAllCampsites = (client) =>
  client.get("/campsites").then((res) => res.data.campsites);

export const updateCampsite = (data, id, client) =>
  client.put(`/campsites/${id}`, data).then((res) => res.data);

export const deleteCampsite = (id, client) =>
  client.delete(`/campsites/${id}`).then((res) => res.data);

export const getOneCampsite = (id, client) =>
  client.get(`/campsites/${id}`).then((res) => res.data);

  export const getMultipleCampsites = (ids, client) =>
  client.post("/campsites/multiple", { ids }).then((res) => res.data.campsites);
  
export const createCampsite = (data, client) => client.post("/campsites", data);

export const uploadCampsiteImage = (data, client) =>
  client.post("/campsites/upload", data).then((res) => res.data);

export const getOneCampsiteWithReviews = (id, client) =>
  client.get(`/campsites/${id}/reviews`).then((res) => res.data.reviews);

export const getAllCampsitesWithReviews = (client) =>
  client.get("/campsites/reviews").then((res) => res.data.campsites);

export const addCampsiteReview = (data, id, client) =>
  client.put(`/campsites/${id}/reviews`, data).then((res) => res.data.reviews);

export const addCampsiteToFavorites = (id, client) =>
  client.put(`/campsites/favourites/${id}`).then((res) => res.data.profile);

export const removeCampsiteFromFavorites = (id, client) =>
  client.delete(`/campsites/favourites/${id}`).then((res) => res.data.profile);


