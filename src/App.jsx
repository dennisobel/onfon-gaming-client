import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres, setConnectionType } from "./store/homeSlice";
import Footer from "./components/footer/Footer";
// import { headless } from "./utils/api";
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
// const proxyUrl = 'http://localhost:3002/proxy'; 

function App() {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false)
    const [connectionType, setConnectionType] = useState('unknown');


    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log("protocol:", window.location.protocol)
        const networkInformation = navigator.connection;
        console.log("type:", navigator.connection)
        console.log("type:", navigator.mozConnection)
        console.log("type:", navigator.webkitConnection)

        const updateConnectionType = () => {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;


            if (connection) {
                const type = connection.type;
                // console.log(type)
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
        console.log(connectionType)
        if (connectionType === "wifi") {
            // The user is connected to WiFi.
            handleModalOpen()
            console.log("on wifi")
        } else if (connectionType === "cellular") {
            // The user is connected to cellular data.
            console.log("on mobile")
        } else {
            // The user is not connected to any network.
        }
    }, [connectionType]);

    const fetchData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");

        // let headerRes = headless()
        let headerRes = await fetch("https://header.safaricombeats.co.ke/").then(res => res.text())
        // console.log(headerRes)

        const parsedData = new XMLParser().parseFromString(headerRes);
        parsedData["ip"] = res.data.ip;

        console.log(parsedData.children[0].children[0].children[0].children[1].value)
        console.log(parsedData)

        if (parsedData.children[0].children[0].children[0].children[1].value === "999") {
            // console.log("wifi")
            dispatch(setConnectionType("wifi"));
            // toast.warn("Please switch to mobile data to continue")
            // handleModalOpen()
        } else {
            console.log("mobile")
            dispatch(setConnectionType("mobile"));
        }
        // setData(parsedData);
        gameRegister(parsedData).then().catch(err => console.log("err:", err));
    };

    return (
        <>
            <BrowserRouter>
                {/* <Header /> */}
                <Routes>
                    {/* <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp" element={user ? <OTP/> : <Navigate to="/login"/>} /> */}
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/:mediaType/:id" element={<Details />} /> */}
                    {/* <Route path="/:id" element={user ? <Details /> : <Navigate to="/login"/>} /> */}
                    {/* <Route path="/search/:query" element={user ? <SearchResult /> : <Navigate to="/login"/>} />
                <Route path="/explore/:mediaType" element={user ? <Explore /> : <Navigate to="/login"/>} /> */}
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
