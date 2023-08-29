import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "./components/footer/Footer";
import Button from '@mui/material/Button';
import { Dialog } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Home = React.lazy(() => import('./pages/home/Home'))
import PageNotFound from "./pages/404/PageNotFound";
import axios from "axios";
import XMLParser from 'react-xml-parser';
import { gameRegister } from "./utils/api";

import { setParsed } from "./store/homeSlice";

import { checkXmlResponse } from "./utils/helper";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 10 });

function App() {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false)
    const [connectionType, setConnectionType] = useState('unknown');
    const [headerdata, setHeaderdata] = useState({})
    const [modalText, setModalText] = useState()


    const handleModalOpen = (text) => {
        setModalText(text)
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        const updateConnectionType = () => {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

            if (connection) {
                const type = connection.type;

                setConnectionType(type);
            }
        };

        if (!navigator.userAgent.toLowerCase().includes("mozilla")) {
            updateConnectionType();

            navigator.connection.addEventListener('change', updateConnectionType);

            return () => {
                navigator.connection.removeEventListener('change', updateConnectionType);
            };
        }
    }, []);


    useEffect(() => {
        fetchData();
    }, []);

    const siteLoad = async (data) => {
        console.log("subscribed:", data)
        const site_load = await axios.post(
            `https://dashboard.epicgames.co.ke/game_play`,
            // `http://localhost:8080/game_play`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    const checkSubscribed = async ({ msisdn, ip }) => {
        let { data } = await axios.post('https://sub.epicgames.co.ke/check-subscribe', { msisdn }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("Subscribed:", data)
        if (data.Subscribed === 1) {
            toast.success("You are subscribed")
        } else if (data.Subscribed === 0) {
            handleModalOpen(`You are about to subscribe to Onfon Gaming Service. This service charges ksh 10 per day.
            To activate the service enter 1 on your phone`)
            subscribe({ msisdn, ip })
        }
    }

    const subscribe = async ({ msisdn, ip }) => {
        let res = await axios.post("https://sub.epicgames.co.ke/activate", {
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

    // function checkXmlResponse(xmlResponse) {
    //     const pattern1 = /<SOAP-ENV:Envelope[^>]*>[\s\S]*?<ns1:MsisdnHash>(.*?)<\/ns1:MsisdnHash>[\s\S]*?<\/SOAP-ENV:Envelope>/;
    //     const pattern2 = /<SOAP-ENV:Envelope[^>]*>[\s\S]*?<ns0:ResponseCode>1<\/ns0:ResponseCode>[\s\S]*?<ns0:ResponseMsg>(.*?)<\/ns0:ResponseMsg>[\s\S]*?<\/SOAP-ENV:Envelope>/;
    //     const match1 = pattern1.exec(xmlResponse);
    //     const match2 = pattern2.exec(xmlResponse);

    //     if (match1) {
    //         return [1, match1[1]];
    //     } else if (match2) {
    //         return [2, match2[1]];
    //     } else {
    //         return null;
    //     }
    // }

    const fetchData = async () => {
        const res = await toast.promise(axios.get("https://api.ipify.org/?format=json"), {
            pending: 'IP is pending',
            success: 'IP resolved 👌',
            error: 'IP rejected 🤯'
        });
        const headerRes = await toast.promise(axios.get("http://header.safaricombeats.co.ke/"), {
            pending: 'Verification pending',
            success: 'Verification resolved 👌',
            error: 'Verification rejected 🤯'
        });

        // console.log("headerRes:", headerRes)


        const [patternNumber, extractedValue] = checkXmlResponse(headerRes.data);

        if (patternNumber) {
            if (patternNumber == 1) {
                // MsisdnHash extracted: 620002852183
                console.log("MsisdnHash extracted:", extractedValue);
                checkSubscribed({ msisdn: extractedValue, ip: res.data.ip })
            } else if (patternNumber == 2) {
                // Prompt user to use cellular data: 999
                console.log("Prompt user to use cellular data:", extractedValue);
                handleModalOpen("Please switch to safaricom mobile data to continue.")
            }
        } else {
            // XML response pattern not recognized.
            console.log("XML response pattern not recognized.");
        }
        setHeaderdata(headerRes.data)
        dispatch(setParsed(headerRes.data))

        // const parsedData = new XMLParser().parseFromString(headerRes.data);
        // parsedData["ip"] = res.data.ip;
        // toast.warn(headerRes.status)
        // setHeaderdata(parsedData)
        // dispatch(setParsed(JSON.stringify(parsedData)));



        // console.log("parsedData:", parsedData)
        // console.log(parsedData.children[0].children[0].children[0].children[1].value)
        // if (connectionType === "wifi" || parsedData.children[0].children[0].children[0].children[1].value === "999") {
        //     handleModalOpen("Please switch to safaricom mobile data to continue!")
        // }
        // await gameRegister(parsedData).then().catch(err => console.log("err:", err));
    };

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home data={headerdata} />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>

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
}

export default App;
