import React, { useEffect, useRef } from 'react';
import * as Icons from "lucide-react";
import gsap from 'gsap';
import logosmk from '../assets/logosmk.png';

const Footer = () => {
  // Destructure icon dengan aman
  const { MapPin, Phone } = Icons;

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dianimasikan elemen halusnya saja, bukan seluruh tag footer agar layout tidak pecah
      gsap.fromTo('.footer-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup wajib GSAP
  }, []); // Ditambahkan array kosong [] agar running sekali saja

  // Ambil icon sosmed dengan pengaman fallback
  const Facebook = Icons.Facebook || Icons.FacebookIcon || Icons.Globe;
  const Twitter = Icons.Twitter || Icons.TwitterIcon || Icons.Share2;
  const Instagram = Icons.Instagram || Icons.InstagramIcon || Icons.Camera;
  const Youtube = Icons.Youtube || Icons.YoutubeIcon || Icons.Video;

  return (
    // Padding kiri kanan disesuaikan (px-4), tidak kaku 6px agar aman di HP
    <footer 
      ref={containerRef}
      className="bg-main border-t border-border" 
      style={{ background: '#1e3a8a', color: 'white', padding: '40px 16px 20px 16px', position: 'relative' }}
    >
      <div className="footer-content container mx-auto">
        
        {/* LAYOUT RESPONSIF:
          grid-cols-1 = 1 kolom di HP (berbaris ke bawah)
          sm:grid-cols-2 = 2 kolom di tablet
          lg:grid-cols-4 = 4 kolom di laptop desktop
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left">
          
          {/* Kolom 1: Profil & Sosmed */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <img src={logosmk} alt="logo smk" width={40} className="object-contain" />
              <span className="font-extrabold text-lg tracking-wide">SMKN 1 Pringgabaya</span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Mencetak generasi yang, <br />
              <span className="font-bold text-yellow-400">PRINGGABAYA</span> <br />
              <span className="text-xs text-gray-200">(Produktif, ReligIus, UNgGul, dan BerdAYA Saing)</span>
            </p>
            {/* Sosmed */}
            <div className="flex gap-3 mt-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white text-blue-900 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white text-blue-400 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition-all shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white text-pink-600 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition-all shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-950 transition-all shadow-sm">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h4 className="font-bold text-base mb-4 text-yellow-400 tracking-wider text-transform: uppercase">Tautan Cepat</h4>
            <ul className="flex flex-col gap-3 text-sm opacity-90">
              <li><a href="#profil" className="hover:text-yellow-300 transition-colors">Profil Sekolah</a></li>
              <li><a href="#ekskul" className="hover:text-yellow-300 transition-colors">Ekstrakurikuler</a></li>
              <li><a href="#ppdb" className="hover:text-yellow-300 transition-colors">Info PPDB Online</a></li>
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami */}
          <div>
            <h4 className="font-bold text-base mb-4 text-yellow-400 tracking-wider text-transform: uppercase">Hubungi Kami</h4>
            <ul className="flex flex-col gap-4 text-sm opacity-90">
              <li className="flex items-start gap-3">
                {MapPin && <MapPin className="shrink-0 text-yellow-400" size={18} />}
                <span>Jl. Pendidikan No. 123, Pringgabaya, Lombok Timur</span>
              </li>
              <li className="flex items-center gap-3">
                {Phone && <Phone className="shrink-0 text-yellow-400" size={18} />}
                <span>0822-3300-0884</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Action Button PPDB */}
          <div className="flex flex-col justify-start">
            <h4 className="font-bold text-base mb-4 text-yellow-400 tracking-wider text-transform: uppercase">Penerimaan Siswa</h4>
            <p className="text-xs mb-4 opacity-80">Bergabunglah bersama kami dan bangun masa depan cemerlang.</p>
            <a 
              href="#ppdb" 
              className="w-full text-center bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold py-2.5 px-4 rounded-lg shadow transition-all duration-200 block"
            >
              Daftar PPDB Sekarang
            </a>
          </div>

        </div>

        {/* Hak Cipta / Copyright */}
        <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-70">
          <p>&copy; {new Date().getFullYear()} SMKN 1 Pringgabaya. All Rights Reserved.</p>
          <p className="text-center sm:text-right">Didesain untuk kebaikan pendidikan.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;