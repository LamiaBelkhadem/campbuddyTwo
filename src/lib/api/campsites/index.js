import axios from "axios";

export const getAllCampsites = (client) => client
    .get("/campsites")
    .then((res) => res.data);
export const updateCampsite = (data, id, client) => client.put(`/campsites/${id}`, data).then(res => res.data)
export const deleteCampsite = (id, client) => client.delete(`/campsites/${id}`).then(res => res.data)
export const getOneCampsite = (id, client) => client.get(`/campsites/${id}`).then(res => res.data)
export const createCampsite = (data, client) => client.post("/campsites", data)

