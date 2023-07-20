import { useEffect, useState } from "react";
import { fetchDataFromApi, fetchGames, fetchGame } from "../utils/api";
const useFetchGame = (url) => {
    const [data, setData] = useState(null);
    const [details,setDetails] = useState()
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchGame(id)
        .then((res) => {
            setLoading(false);
            setDetails(res)
        })
        .catch((error) => {
            setLoading(false);
            setError("Something went wrong while loading game details!");
        })
    }, [url]);

    return { details, loading, error };
};

export default useFetchGame;
