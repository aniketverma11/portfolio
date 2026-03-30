import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/page';
import './app/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
