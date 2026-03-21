import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/page';
import BlogPage from './app/blog/page';
import BlogPostClient from './app/blog/[slug]/BlogPostClient';
import CertificationsPage from './app/certifications/page';
import ProjectsPage from './app/projects/page';
import JarvisChatbot from './components/JarvisChatbot';
import './app/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostClient />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <JarvisChatbot />
    </BrowserRouter>
  );
}
