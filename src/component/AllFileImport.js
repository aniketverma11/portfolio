import React from 'react'
import Header from './header/Header.js'
import Home from './homes/Home.js'
import MiddleFile from './middle/MiddleFile.js'
import About from './about/About.js'

const AllFileImport = () => {
    return (
        <div style={{ backgroundColor: "white" }}>
            <Header />
            <Home />
            <MiddleFile />
            <About />
        </div>
    )
}

export default AllFileImport
