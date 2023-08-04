import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

const Home = () => {
    return (
        <>
            {/* <Header /> */}
            <div className="homePage">
                <HeroBanner />
                <Trending />
            </div>
        </>
    );
};

export default Home;
