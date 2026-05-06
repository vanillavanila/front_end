import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.welcome-img',
        { x: -50, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo('.welcome-text',
        { x: 50, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="profil" className="section bg-white " ref={sectionRef}>
      <div className="container" style={{ borderRadius: '16px', boxShadow:'0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border:'1px solid #f0f0f0' }}>
        <div className="grid grid-cols-2 gap-8 items-center p-5">
          <div className="welcome-img relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-full opacity-20 z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Kepala Sekolah" 
              className="rounded-lg shadow-lg relative z-10 w-full object-cover h-[300px]"
              style={{ height: '300px' }}
            />
          </div>
          <div className="welcome-text pl-8">
            <Quote className="text-primary opacity-20 mb-0" size={38} />
            <h2 className="h2 mb-4 text-main">Sambutan Kepala Sekolah</h2>
            <p className="text-lg text-muted mb-4">
              "Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia. Di SMKN 1 PRINGGABAYA, kami berkomitmen untuk memberikan lingkungan belajar yang inovatif, inklusif, dan berorientasi pada masa depan."
            </p>
            <p className="text-muted mb-6">
              Kami percaya bahwa setiap siswa memiliki potensi unik yang menunggu untuk dikembangkan. Melalui perpaduan kurikulum modern, fasilitas berstandar industri, dan tenaga pengajar profesional, kami siap mengantarkan generasi muda menuju kesuksesan di era digital.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <h4 className="h3" style={{ fontSize: '1.25rem' }}>Pathan S.PD</h4>
                <p className="text-primary font-medium">Kepala SMKN 1 PRINGGABAYA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
