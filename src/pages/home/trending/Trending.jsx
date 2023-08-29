import React, { useEffect, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";


import { useSelector } from "react-redux";

import { fetchGames } from "../../../utils/api";

const Trending = ({data}) => {
    const [filtered, setFiltered] = useState()
    const { query } = useSelector((state) => state.home);

    const [games,setGames] = useState()


    const getGames = () => {
        fetchGames().then(res => setGames(res))
    }

    useEffect(() => {
        getGames()
    },[])

    useEffect(() => {    
        console.log(games)
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
            </ContentWrapper>
            <Carousel games={res} data={data}/>
        </div>
    );
};

export default Trending;
