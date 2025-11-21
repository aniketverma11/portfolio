import React from "react";
import "./Home.css";
import Image from "../assets/boypic.jpg";

const Home = () => {
    return (
        <div className="mainBox">
            <div className="medialBox">
                <div className="medialBoxtopBox">
                    <div className="imageBox">
                        <p>yugal dhiman</p>
                        <img src={Image} alt="BoyImage" />
                    </div>
                </div>
                <div className="medialBoxBottomBox">
                    <div className="medialBoxText">
                        <h1>Building digital products, brands, and experience.</h1>
                    </div>
                    <div className="buttonBox">
                        <p>Latest shots</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
