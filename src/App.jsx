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

function App() {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false)
    const [connectionType, setConnectionType] = useState('unknown');
    // const [parsed,setParsed] = useState({})


    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        console.log("navigation:",navigator.userAgent.toLowerCase())
        fetchData();
    }, []);

    useEffect(() => {
        const updateConnectionType = () => {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            
            if (connection) {
                const type = connection.type;
                
                setConnectionType(type);
            }
        };

        if(!navigator.userAgent.toLowerCase().includes("mozilla")){
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
            handleModalOpen()
        } else if (connectionType === "cellular") {
        } else {
            
        }
    }, [connectionType]);

    const fetchData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        let headerRes = await fetch("http://header.safaricombeats.co.ke/").then(res => res.text())
        const parsedData = new XMLParser().parseFromString(headerRes);
        parsedData["ip"] = res.data.ip;
        // await dispatch(setParsed(JSON.stringify(parsedData)));
        // setParsed(parsedData)
        console.log("parsedData:", parsedData)
        console.log(parsedData.children[0].children[0].children[0].children[1].value)
        if(connectionType === "wifi" || parsedData.children[0].children[0].children[0].children[1].value === "999"){
            handleModalOpen()
        }
        gameRegister(parsedData).then().catch(err => console.log("err:", err));
    };

    return (
        <>
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
}

export default App;
