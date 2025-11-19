import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import DestinationsAdmin from './admin/DestinationsAdmin';
import ItinerariesAdmin from './admin/ItinerariesAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import UsersAdmin from './admin/UsersAdmin';
import BookingsAdmin from './admin/BookingsAdmin';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Itinerary from './pages/Itinerary';
import Gallery from './pages/Gallery';
import About from './pages/About';
import { animations } from './utils/animations';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={animations.pageEnter.initial}
            animate={animations.pageEnter.animate}
            exit={animations.pageEnter.exit}
            transition={animations.pageEnter.transition}
          >
            <Home />
          </motion.div>
        } />
        <Route path="/destinations" element={
          <motion.div
            initial={animations.pageEnter.initial}
            animate={animations.pageEnter.animate}
            exit={animations.pageEnter.exit}
            transition={animations.pageEnter.transition}
          >
            <Destinations />
          </motion.div>
        } />
        <Route path="/itinerary" element={
          <motion.div
            initial={animations.pageEnter.initial}
            animate={animations.pageEnter.animate}
            exit={animations.pageEnter.exit}
            transition={animations.pageEnter.transition}
          >
            <Itinerary />
          </motion.div>
        } />
        <Route path="/gallery" element={
          <motion.div
            initial={animations.pageEnter.initial}
            animate={animations.pageEnter.animate}
            exit={animations.pageEnter.exit}
            transition={animations.pageEnter.transition}
          >
            <Gallery />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div
            initial={animations.pageEnter.initial}
            animate={animations.pageEnter.animate}
            exit={animations.pageEnter.exit}
            transition={animations.pageEnter.transition}
          >
            <About />
          </motion.div>
        } />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<div className="text-xl">欢迎来到后台仪表盘</div>} />
          <Route path="destinations" element={<DestinationsAdmin />} />
          <Route path="itineraries" element={<ItinerariesAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route path="bookings" element={<BookingsAdmin />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;