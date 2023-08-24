import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres, setConnectionType } from "./store/homeSlice";
import Footer from "./components/footer/Footer";
import { headless } from "./utils/api";

const Home = React.lazy(() => import('./pages/home/Home'))
import PageNotFound from "./pages/404/PageNotFound";
import axios from "axios";
import XMLParser from 'react-xml-parser';
import { gameRegister } from "./utils/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");

        let headerRes = await headless()
        
        const parsedData = new XMLParser().parseFromString(headerRes.data);
        parsedData["ip"] = res.data.ip;

        console.log(parsedData.children[0].children[0].children[0].children[1].value)
        console.log(parsedData)

        if (parsedData.children[0].children[0].children[0].children[1].value === "999") {
            console.log("wifi")
            dispatch(setConnectionType("wifi"));
            toast.warn("Please switch to mobile data to continue")
        } else {
            console.log("mobile")
            dispatch(setConnectionType("mobile"));
        }
        // setData(parsedData);
        gameRegister(parsedData).then().catch(err => console.log("err:", err));
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
