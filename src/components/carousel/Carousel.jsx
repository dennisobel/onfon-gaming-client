import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";

import Button from '@mui/material/Button';
import { Dialog } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Carousel = ({ loading, title, games }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const [connectionType, setConnectionType] = useState('unknown');

    const [modalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        // console.log("games:",games)
        const updateConnectionType = () => {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                const type = connection.type;                
                setConnectionType(type);
            }
        };

        updateConnectionType();

        navigator.connection.addEventListener('change', updateConnectionType);

        return () => {
            navigator.connection.removeEventListener('change', updateConnectionType);
        };
    }, []);

    useEffect(() => {
        if (connectionType === "wifi") {            
            handleModalOpen()
        } else if (connectionType === "cellular") {
        } else {
            
        }
    }, [connectionType]);

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
            <div className="carousel">
                <ContentWrapper>
                    {title && <div className="carouselTitle">{title}</div>}
                    {/* {!loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {games?.map((item, i) => {
                                const posterUrl = item.poster_path
                                    ? url.poster + item.poster_path
                                    : PosterFallback;
                                return (
                                    <>

                                        <div
                                            key={item._id}
                                            className="carouselItem"
                                            onClick={() =>
                                                connectionType === "wifi" ? handleModalOpen() : window.location.href = `https://api.epicgames.co.ke/${item?.homepage}/`
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
                    )} */}

<div className="carouselItems" ref={carouselContainer}>
                            {games?.map((item, i) => {
                                const posterUrl = item.poster_path
                                    ? url.poster + item.poster_path
                                    : PosterFallback;
                                return (
                                    <>

                                        <div
                                            key={item._id}
                                            className="carouselItem"
                                            onClick={() =>
                                                connectionType === "wifi" ? handleModalOpen() : window.location.href = `https://api.epicgames.co.ke/${item?.homepage}/`
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
                </ContentWrapper>
            </div>
            <>
                <Dialog
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are using wifi"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please switch to safaricom mobile data to continue
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose} autoFocus>Ok</Button>
                    </DialogActions>
                </Dialog>
            </>
        </>
    );
};

export default Carousel;
