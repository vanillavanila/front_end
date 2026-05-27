import React, { useState, useEffect } from 'react'; 
import { FaArrowUp } from 'react-icons/fa'; 
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Extracurriculars from '../components/Extracurriculars';
import News from '../components/News';

const index = () => {
  // scroll otomatis
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <main style={{ overflowX:'hidden' }}>
        <Navbar />
        <Hero />
        <Extracurriculars />
        <News />
      </main>

      {/* BUTTON SCROLL TOP */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            border: 'none',
            background: '#2563eb', // 3. Perbaikan: data1.warna diubah ke warna solid (atau ganti sesuai tema)
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: 999,
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaArrowUp />
        </button> // 4. Perbaikan Utama: Menutup tag button yang hilang
      )}
    </div>
  );
};

export default index;