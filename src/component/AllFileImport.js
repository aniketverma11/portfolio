import React from 'react'
import Header from './header/Header.js'
import Home from './homes/Home.js'
import SliderFile from './slider/SliderFile.js'
import About from './about/About.js'
import './AllfileImport.css'

const AllFileImport = () => {
    return (
        <>
            <div className="app">
                <header className="header">
                    <Header />
                </header>
                <section className="main-section">
                    <Home />
                    <SliderFile />
                </section>
                <section className="about-section">
                    <About />
                </section>
            </div>
        </>
    )
}

export default AllFileImport