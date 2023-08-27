import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

const Home = () => {
    // const {parsed} = useSelector((state) => state.home);
    // console.log("psd:",parsed?.children[0].children[0].children[0].children[1].value)
    return (
        <>
            {/* <Header /> */}
            <div className="homePage">
                {/* <p>Parsed: {parsed?.children[0].children[0].children[0].children[1].value}</p> */}
                <HeroBanner />
                <Trending />
            </div>
        </>
    );
};

export default Home;
