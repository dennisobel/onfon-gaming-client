import React from "react";
import Header from "../../components/header/Header";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
    return (
        <>
            <Header />
            <div className="homePage">
                <HeroBanner />
                <Trending />
                <Popular />
                <TopRated />
            </div>
        </>
    );
};

export default Home;
