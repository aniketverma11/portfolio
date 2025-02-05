import React from 'react'
import './About.css'
import { FaUikit } from "react-icons/fa";
import { GiSpaceSuit } from "react-icons/gi";
import { PiHeadCircuitFill } from "react-icons/pi";
import { LiaLaptopCodeSolid } from "react-icons/lia";


const About = () => {
    return (
        <>
            <div className='aboutMainBox'>
                <div className='aboutMainBoxTop'>
                    <div className='aboutMainBoxTop headdingBox'>
                        <h1>Collaborate with brands and agencies to create impactful results.</h1>
                    </div>
                </div>
                <div className='aboutMainBoxBottom'>
                    <ul>
                        <li><FaUikit className='icon' /></li>
                        <li>UX & UI</li>
                        <li><p>Designing interfaces that are intuitive, efficient, and enjoyable to use.</p></li>
                    </ul>
                    <ul>
                        <li><GiSpaceSuit className='icon' /></li>
                        <li>Web & Mobile App</li>
                        <li><p>Transforming ideas into exceptional web and mobile app experiences.</p></li>
                    </ul>
                    <ul>
                        <li><PiHeadCircuitFill className='icon' /></li>
                        <li>Design & Creative</li>
                        <li><p>Crafting visually stunning designs that connect with your audience.</p></li>
                    </ul>
                    <ul>
                        <li><LiaLaptopCodeSolid className='icon' /></li>
                        <li>Development</li>
                        <li><p>Bringing your vision to life with the latest technology and design trends.</p></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default About
