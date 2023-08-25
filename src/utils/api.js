import axios from "axios";
// import https from "https";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const GAMES_URL = import.meta.env.GAMES_URL;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const fetchGames = async () => {
    try {
        const data = await axios.get(`https://dashboard.epicgames.co.ke/games`)
        return data
    } catch (error) {
        return error
    }
}

export const fetchGame = async (id) => {
    try {
        const data = await axios.get(`https://dashboard.epicgames.co.ke/games/${id}`)
        return data
    } catch (error) {
        return error
    }
}

export const gameRegister = async (data) => {
    try {
        // const res = await axios.post(`http://localhost:8080/game_play`, data)
        const res = await axios.post(`https://dashboard.epicgames.co.ke/game_play`, data)
    } catch (error) {
        
    }
}

/*
export const headless = async () => {
    try {
        const {data} = await axios.get(`http://localhost:8080/headless`)
        // const {data} = await axios.request(`https://dashboard.epicgames.co.ke/headless`)
        return data
        
    } catch (error) {
        
    }
}
*/

// export const headless = async () => {
//     await fetch("https://header.safaricombeats.co.ke/").then((response) => {
//         console.log("response:",response.text())
        
//         return response.text()
//     })
//     .catch((err) => {console.log("err:",err)})
// }
