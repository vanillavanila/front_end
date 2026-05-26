import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import logosmk from '../assets/logosmk.png'
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const menuData = [
    {
      id: 'profil',
      title: 'Profil',
      links: [
        { name: 'Sambutan Kepala Sekolah', href: '#sambutan' },
        { name: 'Visi Misi', href: '#visi-misi' },
        { name: 'Guru', href: '#guru' },
        { name: 'Pegawai', href: '#pegawai' },
        { name: 'SIM', href: '#sim' },
      ]
    },
    {
      id: 'humas',
      title: 'Humas',
      links: [
        { name: 'BKK & Tracker Study', href: '#bkk' },
        { name: 'Mitra Industri & Perguruan Tinggi', href: '#mitra' },
        { name: 'Guru Tamu, Magang & Sertifikasi', href: '#sertifikasi' },
        { name: 'LSP SMKN 1 Pringgabaya', href: '#lsp' },
      ]
    },
    {
      id: 'kesiswaan',
      title: 'Kesiswaan',
      links: [
        { name: 'Peserta Didik', href: '#siswa' },
        { name: 'Ekstra Kurikuler', href: '#ekskul' },
        { name: 'Alumni', href: '#alumni' },
        { name: 'Prestasi', href: '#prestasi-siswa' },
      ]
    },
    {
      id: 'kurikulum',
      title: 'Kurikulum',
      links: [
        { name: 'PPDB', href: '#ppdb' },
        { name: 'Dapodik', href: '#dapodik' },
        { name: 'Kelulusan', href: '#lulus' },
        { name: 'E-Raport', href: '#eraport' },
        { name: 'Presensi', href: '#presensi' },
        { name: 'KBM', href: '#kbm' },
        { name: 'JIBAS', href: '#jibas' },
        { name: 'Ujian Siswa', href: '#uraian' },
        { name: 'Uji Kompetensi', href: '#ukk' },
      ]
    },
    {
      id: 'kejuruan',
      title: 'Kejuruan',
      links: [
        { name: 'RPL', href: '/jurusan/rpl'},
        { name: 'TKJ', href: '/jurusan/tkj'},
        { name: 'TPM', href: '/jurusan/tpm'},
        { name: 'TPL', href: '/jurusan/tpl'},
        { name: 'TESHA',href:'/jurusan/tesha'},
        { name: 'TJAT',href: '/jurusan/tjat'},
        { name: 'TELIN',href:'/jurusan/telin'},
        { name: 'TAV', href: '/jurusan/tav'},
        { name: 'DPIB', href:'/jurusan/dpib'},
        { name: 'TSM', href: '/jurusan/tsm'},
        { name: 'TKR', href: '/jurusan/tkr'},
        { name: 'TITL', href: '/jurusan/titl'},
        { name: 'TKP', href: '/jurusan/tkp'},
        { name: 'Praktik', href: '#Praktik'},
      ]
    },
    {
      id: 'keuangan',
      title: 'Keuangan',
      links: [
        { name: 'BOS', href: '#bos' },
        { name: 'BPP', href: '#bpp' },
      ]
    },
    {
      id: 'layanan',
      title: 'Layanan',
      links: [
        { name: 'Laboratorium', href: '#lab' },
        { name: 'Ruang Bengkel', href: '#bengkel' },
        { name: 'Perpustakaan', href: '#perpus' },
        { name: 'TEFA', href: '#tefa' },
        { name: 'Kelas Samsung', href: '#kelas' },
      ]
    },
    {
      id: 'kontak',
      title: 'No MTA',
      links: [
        { name: 'Telpon', href: 'tel:#' },
        { name: 'Email', href: '#Email' },
      ]
    }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container navbar-container">
        <a href="/" className="logo-container">
          <img src={logosmk} alt="logo smk" width={40} className='rounded-xl'/>
          <span className="logo-text">SMKN 1 PRINGGABAYA</span>
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul className="nav-links flex items-center gap-4">
            {menuData.map((menu) => (
              <li 
                key={menu.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center gap-1 text-[13px] font-semibold uppercase">
                  {menu.title} <ChevronDown size={14} className={activeDropdown === menu.id ? 'rotate-180' : ''} />
                </button>
                
                {activeDropdown === menu.id && (
                  <div className="dropdown-menu">
                    {menu.links.map((link, index) => (
                      <a key={index} href={link.href} className="dropdown-item">
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Button */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="p-6 overflow-y-auto max-h-[80vh]">
          {menuData.map((menu) => (
          <li key={menu.id} className="mobile-nav-item">
          <button 
          className={`mobile-nav-button ${activeDropdown === menu.id ? 'active' : ''}`}
          onClick={() => setActiveDropdown(activeDropdown === menu.id ? null : menu.id)}
          >
          <span>{menu.title}</span>
          <ChevronDown size={18} className={`chevron-icon ${activeDropdown === menu.id ? 'rotate' : ''}`} />
          </button>

          {/* Sub-menu hanya muncul jika id menu sama dengan activeDropdown */}
          <div className={`mobile-submenu ${activeDropdown === menu.id ? 'show' : ''}`}>
          {menu.links.map((link, index) => (
          <a 
          key={index} 
          href={link.href} 
          className="mobile-submenu-link"
          onClick={() => setIsMobileMenuOpen(false)}
          >
          {link.name}
          </a>
          ))}
          </div>
          </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;