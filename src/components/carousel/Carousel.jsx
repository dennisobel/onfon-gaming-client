import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";

import axios from "axios";
import XMLParser from 'react-xml-parser';

import Button from '@mui/material/Button';
import { Dialog } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { checkXmlResponse } from "../../utils/helper";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Carousel = ({ title, games, data }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const { ip } = useSelector((state) => state.home);
    const [modalOpen, setModalOpen] = useState(false)
    const [patternNumber, setPatternNumber] = useState()
    const [extractedValue, setExtractedValue] = useState()
    const [modalText, setModalText] = useState()
    const [sub,setSub] = useState(false)

    const handleModalOpen = (text) => {
        setModalText(text)
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const checkSubscribed = async ({ msisdn, ip }) => {
        let { data } = await axios.post('http://sub.epicgames.co.ke/check-subscribe', { msisdn }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        if (data.Subscribed === 1) {
            toast.success("You are subscribed")
            setSub(true)
        } else if (data.Subscribed === 0) {
            handleModalOpen(`You are about to subscribe to Onfon Gaming Service. This service charges ksh 10 per day.
            To activate the service enter 1 on the prompt`)
            // subscribe({ msisdn, ip })
            setSub(false)
        }
    }

    const subscribe = async ({ msisdn, ip }) => {
        let res = await axios.post("http://sub.epicgames.co.ke/activate", {
            msisdn,
            ip_address: ip,
            command: "subscribe",
            channel: "epicgames"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    useEffect(() => {
        if (data !== null) {
            let res = checkXmlResponse(data)
            if (res !== null) {
                const [patternNumber, extractedValue] = res;
                setPatternNumber(patternNumber)
                setExtractedValue(extractedValue)
                // if (patternNumber) {
                //     if (patternNumber == 1) {
                //         console.log("MsisdnHash extracted:", extractedValue);
                //         checkSubscribed({ msisdn: extractedValue, ip: res.data.ip });
                //     } else if (patternNumber == 2) {
                //         console.log("Prompt user to use cellular data:", extractedValue);
                //         handleModalOpen("Please switch to safaricom mobile data to continue.");
                //     }
                // } else {
                //     console.log("XML response pattern not recognized.");
                // }
            }
    
        }
    },[data])

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
                    {games ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {games?.map((item, i) => {
                                return (
                                    <>

                                        <div
                                            key={i}
                                            className="carouselItem"
                                            onClick={() => {
                                                if (patternNumber) {
                                                    console.log("patternNumber:", patternNumber)
                                                    if (patternNumber === 1) {
                                                        checkSubscribed({ msisdn: extractedValue, ip });
                                                        console.log("sub:", sub)                                                        
                                                        // sub === true ? window.location.href = `https://api.epicgames.co.ke/${item?.homepage}/` : subscribe({ msisdn: extractedValue, ip })
                                                        sub === false ? window.location.href = `https://api.epicgames.co.ke/${item?.homepage}/` : subscribe({ msisdn: extractedValue, ip })
                                                    } else if (patternNumber === 2) {
                                                        console.log("Prompt user to use cellular data:", extractedValue);
                                                        handleModalOpen("Please switch to safaricom mobile data to continue.");
                                                    }
                                                } else {
                                                    console.log("XML response pattern not recognized.");
                                                }
                                            }
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
                        {"Action Required"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {modalText}
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
