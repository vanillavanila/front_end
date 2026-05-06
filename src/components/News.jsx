import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const sectionRef = useRef(null);

  const newsItems = [
    {
      title: 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2024/2025',
      date: '10 Mei 2024',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Pengumuman'
    },
    {
      title: 'Siswa SMKN 1 Nusantara Juara 1 Lomba Web Design Tingkat Nasional',
      date: '05 Mei 2024',
      author: 'Humas',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Prestasi'
    },
    {
      title: 'Pelaksanaan Ujian Kompetensi Keahlian (UKK) Kelas XII',
      date: '28 April 2024',
      author: 'Kurikulum',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Akademik'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.news-card',
        { x: 75, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 0.8, stagger: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'left 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="berita" className="section bg-white" ref={sectionRef}>
      <div className="container">
        <div className="flex flex-col md:justify-between items-center mb-12">
          <div className='text-center p-3 felx flex-col gap-5'>
            <h2 className="h2 mb-2">Berita & Informasi</h2>
            <p className="text-muted">Dapatkan informasi terbaru seputar SMKN 1 PRINGGABAYA</p>
            <br />
          </div>
          <a href="#" className="btn btn-outline">Lihat Semua Berita</a>
        </div>

        <div style={{ 
          display: 'grid', gap:'2rem',
          gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr'
         }}> 
          {newsItems.map((item, index) => (
            <div key={index} className="news-card card p-0 overflow-hidden flex-cols h-full">
              <div className="relative h-50 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-muted mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {item.author}</span>
                </div>
                <h3 className="h3 mb-4 flex-grow" style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>
                  {item.title}
                </h3>
                <a href="#" className="text-primary font-medium flex items-center hover:underline">
                  Baca Selengkapnya
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
