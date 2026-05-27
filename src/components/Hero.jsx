import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.fromTo('.hero-bg-shape', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out', stagger: 0.2 }
      );

      // Text reveal animation
      gsap.fromTo('.reveal-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="page hero section relative overflow-hidden flex items-center justify-center" ref={heroRef} style={{ overflow:'hidden' }}>
      {/* Abstract Background Shapes */}
      <div className="absolute hero-bg-shape shape-1"></div>
      <div className="absolute hero-bg-shape shape-2"></div>
      <div className="absolute hero-bg-shape shape-3"></div>
      
      <div className="container relative z-10 text-center">
        <h1 className="h1 mb-7 text-main">
          <span className="block reveal-text">Selamat Datang di</span>
          <span className="block reveal-text text-muted">Portal Jurusan</span>
          <span className="block reveal-text text-primary">SMKN 1 Pringgabaya</span>
        </h1>
        <p className="text-lg text-muted mb-8 max-w-2xl mx-auto reveal-text">
          Mencetak generasi yang, <b>PRINGGABAYA</b> <span>Produktif, ReligIus, UNgGul, dan BerdAYA Saing</span>
        </p>
        <div className="flex justify-center gap-4 reveal-text">
          <a href="#ppdb" className="btn btn-primary">
            Daftar PPDB <ArrowRight className="ml-2" size={20} />
          </a>
          <a href="#berita" className="btn btn-outline">
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
