import { useEffect, useState } from "react";
import { fetchGames } from "../utils/api";
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [games,setGames] = useState()
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);
        fetchGames()
        .then(res => setGames(res))
        .catch((error) => {
            setLoading(false);
            setError("Something went wrong while loading games!");
        })
    }, [url]);

    return { data, loading, error, games };
};

export default useFetch;
