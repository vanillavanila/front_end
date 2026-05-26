import React, { useEffect, useRef } from 'react';
// Import semua sebagai satu objek 'Icons' agar tidak error build
import * as Icons from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logosmk from '../assets/logosmk.png'


const Footer = () => {
  // Destructure icon yang pasti aman, sisanya pakai fallback
  const { GraduationCap, MapPin, Phone, Mail } = Icons;

  const fade = useRef(null);

  useEffect(() =>{
    const ctx = gsap.context(() =>{
      gsap.fromTo('.footer',
      {
        opacity:0, scale:2,
      },
    {
      opacity:1, scale:1, duration:2,
    })

    })
  })
  
  // Ambil icon sosmed dengan pengaman (agar tidak crash kalau undefined)
  const Facebook = Icons.Facebook || Icons.FacebookIcon || Icons.Globe;
  const Twitter = Icons.Twitter || Icons.TwitterIcon || Icons.Share2;
  const Instagram = Icons.Instagram || Icons.InstagramIcon || Icons.Camera;
  const Youtube = Icons.Youtube || Icons.YoutubeIcon || Icons.Video;

  return (
    <footer className="footer bg-main border-t border-border" style={{ background:'blue', color:'white', padding:'20px'}}>
      <div className="container">
        <div className="grid grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logosmk} alt="logo smk" width={40}/>
              <span className="h3" style={{ fontSize: '1.2rem', fontWeight: '800' }}>SMKN 1 Pringgabaya</span>
            </div>
            <p className="mb-6 text-sm">
             Mencetak generasi yang, <b>PRINGGABAYA</b> <span>Produktif, ReligIus, UNgGul, dan BerdAYA Saing</span>
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center  hover:text-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:text-primary transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:text-primary transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1 pl-4">
            <h4 className="h3 mb-6" style={{ fontSize: '1rem' }}>Tautan Cepat</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#profil" className="hover:text-primary">Profil Sekolah</a></li>
              <li><a href="#ekskul" className="hover:text-primary">Ekstrakurikuler</a></li>
              <li><a href="#ppdb" className="hover:text-primary">Info PPDB Online</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="h3 mb-6" style={{ fontSize: '1rem' }}>Hubungi Kami</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                {MapPin && <MapPin className="shrink-0 mt-1" size={20} />}
                <span className="text-sm">Jl. Pendidikan No. 123, Kota Nusantara</span>
              </li>
              <li className="flex items-center gap-3">
                {Phone && <Phone className="shrink-0" size={20} />}
                <span className="text-sm">0822-3300-0884</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="h3 mb-6" style={{ fontSize: '1rem' }}>Penerimaan Siswa</h4>
            <a href="#ppdb" className="btn btn-primary w-full text-center">Daftar Sekarang</a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} SMKN 1 Pringgabaya.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;