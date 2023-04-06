// ✨ Frontend Game - Version
import axiosPublic from './api';
import { axiosPrivate } from './api';

// QUERYS - GET

// #1 - Gets the Player's Data
export const getPlayer = async ({ queryKey }) => {
  console.log('GET (Player) queryKey: ', queryKey);
  // Query key Variables:
  // - 1. "endpoint"  => The web server route
  // - 2. "search"
  // - 3. "axiosPrivate"
  const [endpoint, playerData, axiosPrivate] = queryKey;

  if (axiosPrivate) {
    if (playerData) {
      const response = await axiosPrivate.get(`/${endpoint}/${playerData}`);
      return response.data;
    }
    const response = await axiosPrivate.get(`/${endpoint}`);
    return response.data;
  }
  const response = await axiosPublic.get(`/${endpoint}`);
  return response.data;
};

// #2 - Gets a Player's Cards
export const getPlayerCards = async ({ queryKey }) => {
  const [endpoint, playerId, axiosPrivate] = queryKey;
  console.log('GET (Cards) queryKey: ', queryKey);
  const ownerId = playerId;
  console.log('GET (Cards) Owner ID: ', ownerId);

  if (axiosPrivate) {
    if (ownerId) {
      const response = await axiosPrivate.get(`/${endpoint}/${ownerId}`);
      return response.data;
    }
    const response = await axiosPrivate.get(`/${endpoint}`);
    return response.data;
  }
  const response = await axiosPublic.get(`/${endpoint}`);
  return response.data;
};

export const getEverything = async ({ queryKey }) => {
  console.log('GET (Everthing from Player) queryKey: ', queryKey);
  // Query key Variables:
  // - 1. "endpoint"  => The web server route
  // - 2. "search"
  // - 3. "axiosPrivate"
  const [endpoint, playerData, axiosPrivate] = queryKey;

  if (axiosPrivate) {
    if (playerData) {
      const response = await axiosPrivate.get(`/${endpoint}/${playerData}`);
      return response.data;
    }
    const response = await axiosPrivate.get(`/${endpoint}`);
    return response.data;
  }
  const response = await axiosPublic.get(`/${endpoint}`);
  return response.data;
};
// export const getEverything = async ({ queryKey }) => {
//   const [endpoint, playerId, axiosPrivate] = queryKey;
//   console.log('GET (Cards) queryKey: ', queryKey);
//   const ownerId = playerId;
//   console.log('GET (Cards) Owner ID: ', ownerId);

//   if (axiosPrivate) {
//     if (ownerId) {
//       const response = await axiosPrivate.get(`/${endpoint}/${ownerId}`);
//       return response.data;
//     }
//     const response = await axiosPrivate.get(`/${endpoint}`);
//     return response.data;
//   }
//   const response = await axiosPublic.get(`/${endpoint}`);
//   return response.data;
// };

// #3 - Get Latest ID
export const getLastestId = async ({ queryKey }) => {
  const [endpoint, table, axiosPrivate] = queryKey;
  console.log('GET (Latest ID) queryKey: ', queryKey);

  if (axiosPrivate) {
    if (table) {
      const response = await axiosPrivate.get(`/${endpoint}/${table}`);
      return response.data;
    }
  }
};

// export const getCardById = async ({ queryKey }) => {
//   const [endpoint, cardId] = queryKey;
//   console.log('POST (Create Card) Card Object: ', variables);
//   const response = await axiosPrivate.get(`/${endpoint}/${cardId}`);
//   return response.data;
// };

// MUTATIONS - POST

// #1 - Create Card
export const createCard_API = async (variables) => {
  // const { cardObj } = variables;
  // console.log('POST (Create Card) queryKey: ', cardObj);
  console.log('POST (Create Card) Card Object: ', variables);

  if (axiosPrivate) {
    if (variables) {
      const response = await axiosPrivate.post(`/cards`, variables);
      return response.data;
    }
  }
};

// #1 - Create Card
export const uploadCardStats = async (variables) => {
  // const { cardObj } = variables;
  // console.log('POST (Create Card) queryKey: ', cardObj);
  console.log('POST (Upload Card Stats) Card Object: ', variables);

  if (axiosPrivate) {
    if (variables) {
      const response = await axiosPrivate.post(`/card-stats`, variables);
      return response.data;
    }
  }
};

// MUTATIONS - PUT (Update)

export const updatePlayerData = async (variables) => {
  console.log('PUT (Update Data) Variables: ', variables);
  const id = variables.id;

  if (variables) {
    const response = await axiosPrivate.put(`/players/${id}`, variables);
    return response.data;
  }
  console.error(
    '😫 APi-Fns::updatePlayerData => Got No Variables from useMutation'
  );
};

export const updateCardData = async (variables) => {
  console.log('>>> PUT (Update - CARD - Data) Variables: ', variables);
  const id = variables.id;

  if (variables) {
    const response = await axiosPrivate.put(`/cards/${id}`, variables);
    return response.data;
  }
  console.error(
    '😫 APi-Fns::updateCardData => Got No Variables from useMutation'
  );
};

export const updateCardStatsData = async (variables) => {
  console.log('>>> PUT (Update - CARD - STATS - Data) Variables: ', variables);
  const id = variables.id; // 22

  if (variables) {
    const response = await axiosPrivate.put(`/card-stats/${id}`, variables);
    return response.data;
  }
  console.error(
    '😫 APi-Fns::updateCardData => Got No Variables from useMutation'
  );
};
