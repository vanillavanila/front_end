import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Extracurriculars from './components/Extracurriculars';
import News from './components/News';
import Footer from './components/Footer';

// Use a smooth scrolling implementation (lenis or just native)
// We will use CSS scroll behavior for simplicity

function App() {
  useEffect(() => {
    // Apply smooth scrolling to the html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Welcome />
        <Extracurriculars />
        <News />
      </main>
      <Footer />
    </div>
  );
}

export default App;
