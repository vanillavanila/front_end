import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Ekskul.css';
import { Code, Music, Trophy, MonitorPlay, Camera, HeartPulse, Bot, FlagTriangleRight, Shield, icons, Footprints, Accessibility, Swords, Languages, Landmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Extracurriculars = () => {
  const sectionRef = useRef(null);

  const ekskul = [
    { name: 'Web Design', icon: <Code size={32} />, color: '#2563eb' },
    { name: 'Seni Musik(Band, Drumb Band)', icon: <Music size={32} />, color: '#ec4899' },
    { name: 'Pramuka', icon: <Trophy size={32} />, color: '#f59e0b' },
    { name: 'E-Sports', icon: <MonitorPlay size={32} />, color: '#8b5cf6' },
    { name: 'Fotografi', icon: <Camera size={32} />, color: '#10b981' },
    { name: 'PMR', icon: <HeartPulse size={32} />, color: '#ef4444' },
    { name: 'Olahraga(Futsal, voli, Basket, Badminton)', icon: <Footprints size={32} />, color: '#f9530b'},
    { name: 'Robotik', icon: <Bot size={32} />, color: '#255eb'},
    { name: 'Paskib', icon: <Shield size={32} />, color:'#f58e0b'},
    { name: 'Seni Tari', icon: <Accessibility size={32} />,  color:'#ec4899'},
    { name: 'Ekskul Bahasa Jepang', icon: <Languages size={32} />, color:'#ef4444'},
    { name: 'Bela Diri(Pencak Silat, Karate)', icon: <Swords size={32} />, color:'#2563eb'}
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ekskul-card',
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ekskul" className="jp-matrix section bg-main text-center group" ref={sectionRef}>
      <div className="container text-center">
        <h2 className="h2 mb-4">Ekstrakurikuler</h2>
        <p className="text-muted mb-12 max-w-2xl mx-auto">
          Kembangkan bakat dan minatmu melalui berbagai kegiatan ekstrakurikuler pilihan yang didukung oleh fasilitas memadai dan pembina profesional.
        </p>

        <div className="grid gap-4">
          {ekskul.map((item, index) => (
            <div key={index} className="ekskul-card card flex-col items-center justify-center text-center gap-3">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="h3" style={{ fontSize: '1rem' }}>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Extracurriculars;
