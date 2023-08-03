import React, { useEffect, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import dummy from "../../../data";

import { useSelector } from "react-redux";

import { fetchGames } from "../../../utils/api";

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const [filtered, setFiltered] = useState()
    const { query } = useSelector((state) => state.home);

    const [games,setGames] = useState()

    const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

    const getGames = () => {
        fetchGames().then(res => setGames(res))
    }

    useEffect(()=>{
        getGames()
    },[])

    useEffect(() => {
        console.log("query",query);
        console.log("games:",games)
    
        let res = games !== undefined && games?.data.filter(el => {
            return el?.title?.toLowerCase() === query?.toLowerCase();
        });
    
        setFiltered(res);
    
    }, [games, query]);    

    const res = query !== "" ? filtered : games?.data

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Games</span>
                {/* <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} /> */}
            </ContentWrapper>
            <Carousel data={dummy?.results} loading={loading} games={res} />
        </div>
    );
};

export default Trending;
