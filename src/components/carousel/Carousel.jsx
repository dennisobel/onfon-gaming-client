import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./style.scss";

import Button from '@mui/material/Button';
import { Dialog } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Carousel = ({ data, loading, endpoint, title, games }) => {
    const { connection_type } = useSelector((state) => state.home);
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);

    const [modalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

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
                                                connection_type === "wifi" ? handleModalOpen() : window.location.href = `https://api.epicgames.co.ke/${item?.homepage}/`
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
