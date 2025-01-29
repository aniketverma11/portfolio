import React from 'react'
import Header from './header/Header.js'
import Home from './homes/Home.js'
import MiddleFile from './middle/MiddleFile.js'

const AllFileImport = () => {
    return (
        <div style={{ backgroundColor: "white" }}>
            <Header />
            <Home />
            <MiddleFile />
        </div>
    )
}

export default AllFileImport
