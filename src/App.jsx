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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        // console.log("connection type:",connectionType)
        if (connectionType === "wifi") {
            handleModalOpen("Please switch to safaricom mobile data to continue.")
        } else if (connectionType === "cellular") {
        } else {

        }
    }, [connectionType]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log("headerdata:", headerdata)
        // checkSubscribed()
        // subscribe()
        siteLoad(headerdata)
    }, [headerdata])

    const checkSubscribed = async () => {
        let { data } = await axios.post('http://sub.epicgames.co.ke/check-subscribe', { msisdn: "254726354124" }, {
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
            subscribe()
        }
    }

    const subscribe = async () => {
        let res = await axios.post("http://sub.epicgames.co.ke/activate", {
            msisdn: "254727677068",
            ip_address: headerdata.ip,
            command: "subscribe",
            channel: "epicgames"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

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

        console.log("site_load:", site_load)
    }

    const fetchData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        let headerRes = await fetch("https://header.safaricombeats.co.ke/").then(res => res.text()).catch(err => console.log("err:", err))
        const parsedData = new XMLParser().parseFromString(headerRes);
        parsedData["ip"] = res.data.ip;
        setHeaderdata(parsedData)
        dispatch(setParsed(JSON.stringify(parsedData)));

        // console.log("parsedData:", parsedData)
        // console.log(parsedData.children[0].children[0].children[0].children[1].value)
        if (connectionType === "wifi" || parsedData.children[0].children[0].children[0].children[1].value === "999") {
            handleModalOpen("Please switch to safaricom mobile data to continue.")
        }
        // await gameRegister(parsedData).then().catch(err => console.log("err:", err));
    };

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
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
