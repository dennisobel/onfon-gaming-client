import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title, games }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

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
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                {/* <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                /> */}
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
                                            navigate(
                                                `/${item._id}`
                                            )
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
    );
};

export default Carousel;
