import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import dummy from "../../../data";

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading, games } = useFetch(`/trending/movie/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Games</span>
                {/* <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} /> */}
            </ContentWrapper>
            <Carousel data={dummy?.results} loading={loading} games={games} />
        </div>
    );
};

export default Trending;
