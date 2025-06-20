import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import WhatIDo from './pages/WhatIDo';
import Circle from './pages/Circle';
import Webinars from './pages/Webinars';
import Community from './pages/Community';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Events from './pages/Events';
import Companies from './pages/Companies';
import Colleges from './pages/Colleges';
import StudentCommunity from './pages/StudentCommunity';
import Ainxtgen from './pages/Ainxtgen';
import QueenflluenceHub from './pages/QueenflluenceHub';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <Layout>
              <Companies />
            </Layout>
          }
        />
        <Route
          path="/colleges"
          element={
            <Layout>
              <Colleges />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <div className="flex flex-col">
                <section id="home" className="min-h-screen py-1">
                  <Home />
                </section>
                <section id="about" className="min-h-screen py-20 bg-gray-50">
                  <About />
                </section>
                <section id="what-i-do" className="min-h-screen py-20">
                  <WhatIDo />
                </section>
                <section id="circle" className="min-h-screen py-20 bg-gray-50">
                  <Circle />
                </section>
                <section id="events" className="min-h-screen py-20">
                  <Events />
                </section>
                <section id="webinars" className="min-h-screen py-20 bg-gray-50">
                  <Webinars />
                </section>
                <section id="community" className="min-h-screen py-20 bg-gray-50">
                  <Community />
                </section>
                <section id="student-community" className="min-h-screen py-20">
                  <StudentCommunity />
                </section>
                <section id="ainxtgen" className="min-h-screen py-20 bg-gray-50">
                  <Ainxtgen />
                </section>
                <section id="queenflluence-hub" className="min-h-screen py-20">
                  <QueenflluenceHub />
                </section>
                <section id="gallery" className="min-h-screen py-20">
                  <Gallery />
                </section>
                <section id="testimonials" className="min-h-screen py-20 bg-gray-50">
                  <Testimonials />
                </section>
                <section id="contact" className="min-h-screen py-20">
                  <Contact />
                </section>
              </div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 