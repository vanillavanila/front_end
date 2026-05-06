import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Music, Trophy, MonitorPlay, Camera, HeartPulse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Extracurriculars = () => {
  const sectionRef = useRef(null);

  const ekskul = [
    { name: 'Pramuka', icon: <Trophy size={32} />, color: '#f59e0b' },
    { name: 'Web Design', icon: <Code size={32} />, color: '#2563eb' },
    { name: 'Seni Musik', icon: <Music size={32} />, color: '#ec4899' },
    { name: 'E-Sports', icon: <MonitorPlay size={32} />, color: '#8b5cf6' },
    { name: 'Fotografi', icon: <Camera size={32} />, color: '#10b981' },
    { name: 'PMR', icon: <HeartPulse size={32} />, color: '#ef4444' },
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
    <section id="ekskul" className="section bg-main" ref={sectionRef}>
      <div className="container text-center">
        <h2 className="h2 mb-4">Ekstrakurikuler</h2>
        <p className="text-muted mb-12 max-w-2xl mx-auto">
          Kembangkan bakat dan minatmu melalui berbagai kegiatan ekstrakurikuler pilihan yang didukung oleh fasilitas memadai dan pembina profesional.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {ekskul.map((item, index) => (
            <div key={index} className="ekskul-card card flex-col items-center justify-center text-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="h3" style={{ fontSize: '1.25rem' }}>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Extracurriculars;
