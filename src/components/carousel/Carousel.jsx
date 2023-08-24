import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title, games }) => {
    const { connection_type } = useSelector((state) => state.home);
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <>
            <ToastContainer />

            <div className="carousel">
                <ContentWrapper>
                    {title && <div className="carouselTitle">{title}</div>}
                    {!loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {games?.map((item, i) => {
                                const posterUrl = item.poster_path
                                    ? url.poster + item.poster_path
                                    : PosterFallback;
                                return (
                                    <>
                                        {/* <div
                                    key={item._id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(
                                            `/${item._id}`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={item.poster_path} />
                                        <div>
                                        <CircleRating
                                            rating={1+i}
                                        />
                                        </div>
                                        
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                    </div>
                                </div> */}

                                        <div
                                            key={item._id}
                                            className="carouselItem"
                                            onClick={() =>
                                                // navigate(
                                                //     `/${item._id}`
                                                // )
                                                connection_type === "wifi" ? toast.warn("Please switch to mobile data to continue") : window.location.href = `https://api.epicgames.co.ke/${item?.homepage}/`
                                            }
                                        >
                                            <div className="posterBlock">
                                                <Img src={item.poster_path} />
                                                <div>
                                                    <CircleRating
                                                        rating={1 + i}
                                                    />
                                                </div>
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {item.title || item.name}
                                                </span>
                                            </div>
                                        </div>

                                    </>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )}
                </ContentWrapper>
            </div>
        </>
    );
};

export default Carousel;
