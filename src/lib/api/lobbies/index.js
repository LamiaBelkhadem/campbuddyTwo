export const getAllLobbies = (client) => client.get("/lobbies/").then(res => res.data.lobbies);
export const getOneLobby = (id, client) => client.get(`/lobbies/${id}`).then(res => res.data.lobby);
export const createLobby = (data, client) => client.post("/lobbies", data).then(res => res.data.lobby);
export const updateLobby = (data, id, client) => client.put(`/lobbies/${id}`, data).then(res => res.data.lobby);
export const deleteLobby = (id, client) => client.delete(`/lobbies/${id}`).then(res => res.data.message);