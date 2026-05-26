import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, User, Volume2, VolumeX } from 'lucide-react'; // PERBAIKAN: Tambahkan ikon volume
import './VideoBackround.css';
import './News.css';

gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null); // PERBAIKAN: Definisikan useRef untuk video
  const [isMuted, setIsMuted] = useState(true); // PERBAIKAN: Definisikan state mute

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
    // Autoplay handler
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay diblokir browser:", error);
      });
    }

    // GSAP Animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.news-card',
        { y: 50, opacity: 0 }, // Menggunakan 'y' agar cards muncul dari bawah ke atas lebih natural
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, // Mengurangi stagger agar tidak terlalu lama menunggu antrean kartu
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // PERBAIKAN: Menggunakan 'top' untuk deteksi scroll vertikal
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="news-section relative overflow-hidden py-20 min-h-screen flex flex-col justify-center items-center" ref={sectionRef}>
      
      {/* BACKGROUND VIDEO */}
      <div className="video-background-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="bg-video"
        >
          <source src="/videos/bg_video.mp4" type="video/mp4" />
          Browser Anda tidak mendukung pemutaran video.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* TOMBOL MUTE/UNMUTE */}
      <button 
        style={{ color:'white' }}
        onClick={toggleMute} 
        className="absolute bottom-6 right-6 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
        title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

    </section>
  );
};

export default News;