import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchGames = async () => {
  try {
    // const data = await axios.get(`https://dashboard.epicgames.co.ke/games`);
    const data = await axios.get(`http://localhost:8080/games`);
    return data;
  } catch (error) {
    return error;
  }
};

export const gameRegister = async (data) => {
  try {
    const res = await axios.post(`http://localhost:8080/game_play`, data)
    // const res = await axios.post(
    //   `https://dashboard.epicgames.co.ke/game_play`,
    //   data
    // );
  } catch (error) {}
};
