import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/page';
import BlogPage from './app/blog/page';
import BlogPostClient from './app/blog/[slug]/BlogPostClient';
import JarvisChatbot from './components/JarvisChatbot';
import './app/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostClient />} />
      </Routes>
      <JarvisChatbot />
    </BrowserRouter>
  );
}
