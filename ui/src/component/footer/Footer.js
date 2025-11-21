import React from 'react'
import './Footer.css'
import { GiShakingHands } from "react-icons/gi";

const Footer = () => {
    return (
        <>
            <div className='footerMainBox'>
                <div className='footerMainBoxTopChild'>
                    <div className='footerMainBoxTopChild_Content'>
                        <GiShakingHands className='HandsIcon' />
                        <h1>Tell me about your next project</h1>
                        <div className='linkBox'>
                            <a className='a' href="/" alt="Example Website">Email</a>
                            <a className='a' href="/" alt="Example Website">WhatsApp</a>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='footerMainBoxBottamChild'>
                    <h4>© 2024 All rights reserved.</h4>
                    <ul>
                        <li><a className='socialMediaIcons' href="https://www.linkedin.com" target='blanck' alt="error">LinkedIn</a></li>
                        <li>/</li>
                        <li><a className='socialMediaIcons' href="https://www.dribbble.com" target='blanck' alt="error">Dribbble</a></li>
                        <li>/</li>
                        <li><a className='socialMediaIcons' href="https://www.instagram.com" target='blanck' alt="error">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer
