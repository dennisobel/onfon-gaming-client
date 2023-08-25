import React, { useEffect, useState } from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

const Home = () => {
    const [connectionType, setConnectionType] = useState('unknown');



    useEffect(() => {
        console.log("protocol:", window.location.protocol)
        const networkInformation = navigator.connection;
        console.log("type:", navigator.connection)
        console.log("type:", navigator.mozConnection)
        console.log("type:", navigator.webkitConnection)

        // if (networkInformation.type === "wifi") {
        //   // The user is connected to WiFi.
        //   console.log("on wifi")
        // } else if (networkInformation.type === "cellular") {
        //   // The user is connected to cellular data.
        //   console.log("on mobile")	
        // } else {
        //   // The user is not connected to any network.
        // }
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
    return (
        <>
            {/* <Header /> */}
            <div className="homePage">
                <HeroBanner />
                <p>Connection Type: {connectionType}</p>
                <Trending />
            </div>
        </>
    );
};

export default Home;
