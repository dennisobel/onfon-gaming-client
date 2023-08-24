import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres, setConnectionType } from "./store/homeSlice";
import Footer from "./components/footer/Footer";
import { fetch as fetchPolyfill } from 'whatwg-fetch'

// import Home from "./pages/home/Home";
const Home = React.lazy(() => import('./pages/home/Home'))
// import Details from "./pages/details/Details";
// import Header from "./components/header/Header";
// import SearchResult from "./pages/searchResult/SearchResult";
// import Explore from "./pages/explore/Explore";
// import Signup from "./pages/signup/Signup";
// import Login from "./pages/login/Login";
// import OTP from "./pages/otp";
import PageNotFound from "./pages/404/PageNotFound";
import { getUsername } from "../helper";
import axios from "axios";
// var XMLParser = require("react-xml-parser");
import XMLParser from 'react-xml-parser';
import { gameRegister } from "./utils/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    // const { url } = useSelector((state) => state.home);
    // const user = getUsername();
    // const [ip, setIP] = useState();
    // const [data, setData] = useState();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        // setIP(res.data.ip);
        // const requestOptions = {
        //     method: 'GET',
        //     agent: new (require('https').Agent)({ rejectUnauthorized: false }) // This option disables SSL verification
        //   };

        //   try {
        //     const response = await fetch('https://header.safaricombeats.co.ke/', requestOptions);
        //     const data = await response.json();
        //     console.log('Response:', data);
        //   } catch (error) {
        //     console.error('Error:', error);
        //   }

        const headerRes = await fetch('https://header.safaricombeats.co.ke/', {
            credentials: 'omit',
        });

        // let https = await import('node:https');

        // const headerRes = await axios.get("https://header.safaricombeats.co.ke/", {
        //     httpsAgent: {
        //         rejectUnauthorized: false
        //     }
        // });
        // https://header.safaricombeats.co.ke/
        const parsedData = new XMLParser().parseFromString(headerRes.data);
        parsedData["ip"] = res.data.ip;

        console.log(parsedData.children[0].children[0].children[0].children[1].value)

        if (parsedData.children[0].children[0].children[0].children[1].value) {
            dispatch(setConnectionType("wifi"));
            toast.warn("Please switch to mobile data to continue")
        } else {
            dispatch(setConnectionType("mobile"));
        }
        // setData(parsedData);
        gameRegister(parsedData).then().catch(err => console.log("err:", err));
    };

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <>
            <ToastContainer />
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
        </>
    );
}

export default App;
