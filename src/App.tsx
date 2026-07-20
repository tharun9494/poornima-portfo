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
import Memberships from './pages/Memberships';
import Path from './pages/Path';
import SuccessStories from './pages/SuccessStories';

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
          path="/memberships"
          element={
            <Layout>
              <Memberships />
            </Layout>
          }
        />
        <Route
          path="/path"
          element={
            <Layout>
              <Path />
            </Layout>
          }
        />
        <Route
          path="/success-stories"
          element={
            <Layout>
              <SuccessStories />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <div className="flex flex-col">
                <section id="home" className="w-full">
                  <Home />
                </section>
                <section id="about" className="w-full">
                  <About />
                </section>
                <section id="what-i-do" className="w-full">
                  <WhatIDo />
                </section>
                <section id="circle" className="w-full">
                  <Circle />
                </section>
                <section id="events" className="w-full">
                  <Events />
                </section>
                <section id="webinars" className="w-full">
                  <Webinars />
                </section>
                <section id="community" className="w-full">
                  <Community />
                </section>
                <section id="student-community" className="w-full">
                  <StudentCommunity />
                </section>
                <section id="ainxtgen" className="w-full">
                  <Ainxtgen />
                </section>
                <section id="queenflluence-hub" className="w-full">
                  <QueenflluenceHub />
                </section>
                <section id="gallery" className="w-full">
                  <Gallery />
                </section>
                <section id="testimonials" className="w-full">
                  <Testimonials />
                </section>
                <section id="contact" className="w-full">
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