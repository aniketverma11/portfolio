import React from "react";
import "./Header.css";
import cv from '../assets/Resume .pdf'
const Header = () => {

    const CopyEmail = () => {
        const email = "yugaldhiman14@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };
    return (
        <>
            <div className="header">
                <div className="headerLeftBox">
                    <div className="emailBox">
                        <p>yugaldhiman14@gmail.com</p>
                    </div>
                    <div className="copyBox" onClick={CopyEmail}>
                        <p>Copy</p>
                    </div>
                    <div className="cvBox">
                        <a className="a" href={cv} target="blank">Cv</a>
                    </div>
                </div>
                <div className="headerRightBox">
                    <a href="https://www.linkedin.com" target="blank">
                        Linkedin
                    </a>

                    <a href="https://www.github.com" target="blank">
                        GitHub
                    </a>

                    <a href="https://www.facebook.com" target="blank">
                        Facebook
                    </a>
                </div>
            </div>
        </>
    );
};

export default Header;
