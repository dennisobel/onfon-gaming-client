import React, { useEffect, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

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
        let res = games !== undefined && games?.data.filter(el => {
            return el?.title?.toLowerCase() === query?.toLowerCase();
        });
    
        setFiltered(res);
    
    }, [games, query]);    

    const res = query !== "" ? filtered : games?.data


    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Games</span>
                {/* <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} /> */}
            </ContentWrapper>
            <Carousel loading={loading} games={res} />
        </div>
    );
};

export default Trending;
