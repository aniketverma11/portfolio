import React, { useEffect, useRef } from "react";
import "./MiddleFile.css";
import "animate.css";

const MiddleFile = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const slides = slider.querySelectorAll(".slide");
        const slideCount = slides.length;
        let index = 0;

        const slidesArray = Array.from(slides);
        slidesArray.forEach(slide => {
            const clonedSlide = slide.cloneNode(true);
            slider.appendChild(clonedSlide);
        });

        function moveSlider() {
            const slideWidth = slider.querySelector(".slide").clientWidth;
            index++;
            slider.style.transition = "transform 0.6s ease";
            slider.style.transform = `translateX(-${index * slideWidth}px)`;

            if (index === slideCount * 2) {
                setTimeout(() => {
                    slider.style.transition = "none";
                    slider.style.transform = "translateX(0)";
                    index = 0;
                }, 600);
            }
        }

        const intervalId = setInterval(moveSlider, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="slider-container">
            <div className="slider" ref={sliderRef}>
                <div className="slide">
                    <ul>
                        <li>Slide 1</li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li>Slide 2</li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li>Slide 3</li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li>Slide 4</li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li>Slide 5</li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li>Slide 6</li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li>Slide 7</li>
                    </ul>
                </div>
                <div className="slide">
                    <ul>
                        <li>Slide 8</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MiddleFile;

