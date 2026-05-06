import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
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
      id: 'kejuruan',
      title: 'Kejuruan',
      links: [
        { name: 'RPL', href: '#rpl'},
        { name: 'TKJ', href: '#tkj'},
        { name: 'TPM', href: '#tpm'},
        { name: 'TPL', href: '#tpl'},
        { name: 'TESHA',href:'#TESHA'},
        { name: 'TJAT',href: '#tjat'},
        { name: 'TELIN',href:'#telin'},
        { name: 'TAV', href: '#tav'},
        { name: 'DPIB', href:'#dpib'},
        { name: 'TSM', href: '#tsm'},
        { name: 'TKR', href: '#tkr'},
        { name: 'TITL', href: '#titl'},
        { name: 'TKP', href: '#tkp'},
        { name: 'Prestasi', href: '#Prestasi'},
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
        { name: 'Dapodik', href: '#dapodik' },
        { name: 'Ekstra Kurikuler', href: '#ekskul' },
        { name: 'Alumni', href: '#alumni' },
        { name: 'Prestasi', href: '#prestasi-siswa' },
      ]
    },
    {
      id: 'kurikulum',
      title: 'Wakakurikulum',
      links: [
        { name: 'PPDB', href: '#ppdb' },
        { name: 'Kelulusan', href: '#lulus' },
        { name: 'E-Raport', href: '#eraport' },
        { name: 'Presensi', href: '#presensi' },
        { name: 'KBM', href: '#kbm' },
        { name: 'JIBAS', href: '#jibas' },
        { name: 'Uraian Siswa', href: '#uraian' },
        { name: 'Uji Kompetensi', href: '#ukk' },
      ]
    },
    {
      id: 'keuangan',
      title: 'Keuangan',
      links: [
        { name: 'BJS', href: '#bjs' },
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
        { name: 'Kelas Samping', href: '#kelas' },
      ]
    },
    {
      id: 'kontak',
      title: 'No MTA',
      links: [
        { name: 'Telpon', href: 'tel:#' },
        { name: 'Mamat', href: '#mamat' },
      ]
    }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="logo-container">
          <GraduationCap className="logo-icon text-primary" size={32} />
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