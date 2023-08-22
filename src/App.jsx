import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Footer from "./components/footer/Footer";
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

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    const user = getUsername();


    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    useEffect(() => {
        axios.get("http://header.safaricombeats.co.ke/").then((res) => {
            var data = new XMLParser().parseFromString(res.data)
            console.log("data:", data)
            gameRegister(data).then(res => console.log("res:", res)).catch(err => console.log("err:", err))
            // let parser = new Parser();
            // parser.parseString(res.data, (err, result) => {
            //     console.log("result:",result)
            // });
        });
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    }; 7

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
    );
}

export default App;
