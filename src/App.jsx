import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Pastikan huruf J besar dan nama file sesuai dengan sidebar VS Code kamu
import LandingPage from './Pages/LandingPage';
import JurusanPage from './Pages/jurusanPages'; 
import { Home } from 'lucide-react';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="app-wrapper">
      <Router>
        
        <main>
          
        <Navbar />
          <Routes>
            {/* Halaman Home */}
            <Route path="/" element={<LandingPage />} />
            {/* Halaman Jurusan Dinamis */}
            <Route path="/jurusan/:id" element={<JurusanPage />} />
          </Routes>
          <br />
          <br />
          <br />
          <br />
        <Footer />
        </main>

      </Router>
    </div>
  );
}

export default App;