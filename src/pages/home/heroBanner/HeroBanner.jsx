import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import logo from "../../../assets/slot.jpg";

import { setQuery } from "../../../store/homeSlice";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [localQuery, setLocalQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const dispatch = useDispatch()
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (event) => {
        event.preventDefault();
        if (event.key === "Enter") {
            if (localQuery.length > 0) {
                console.log(localQuery);
                dispatch(setQuery(localQuery));
                // navigate(`/search/${localQuery}`);
            } else {
                dispatch(setQuery(""));
            }
        }
    };
    

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={logo} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <br/>
                    <span className="subTitle">
                        Hundreds of games to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a game."
                            onChange={(e) => setLocalQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
