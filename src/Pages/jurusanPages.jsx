import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { jurusanData } from '../data/jurusanData';
import api from '../services/api';
import { gsap } from 'gsap';
import './loading.css';
import Pagination from '../components/Pagination';
import { FaArrowUp } from 'react-icons/fa';

const JurusanPage = () => {
  const { id } = useParams();

  // THEME STATIC
  const data1 = jurusanData[id?.toLowerCase()] || {
    warna: '#2563eb',
    heroImg: 'https://via.placeholder.com/1200x400',
    singkatan: 'JURUSAN',
    nama: 'Jurusan'
  };

  // STATE
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('profil');
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const itemPerPage = 2;

  // REFS
  const heroTextRef = useRef(null);
  const contentRef = useRef(null);

  // FETCH DATA
  useEffect(() => {
    setLoading(true);
    api.get(`/jurusan/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // RESET PAGINATION ON TAB CHANGE
  useEffect(() => {
    setCurrentPage(1);
    setExpandedArticle(null); // Reset expand artikel saat pindah tab
  }, [tab]);

  // HERO ANIMATION
  useEffect(() => {
    if (!loading && data && heroTextRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          heroTextRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" } // Diubah dari bounce agar lebih modern profesional
        );
      });
      return () => ctx.revert(); // Membersihkan memory
    }
  }, [data, loading]);

  // CONTENT ANIMATION WITH GSAP CLEANUP
  useEffect(() => {
    if (!loading && data && contentRef.current) {
      const ctx = gsap.context(() => {
        const items = contentRef.current.querySelectorAll('.animate-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
          );
        }
      }, contentRef);

      return () => ctx.revert(); // Mencegah penumpukan animasi (Memory Leak)
    }
  }, [tab, data, loading, currentPage]);

  // SCROLL TO TOP DETECTOR
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // PAGINATION HELPER
  const paginateData = (items = []) => {
    const start = (currentPage - 1) * itemPerPage;
    return (items || []).slice(start, start + itemPerPage);
  };

  const totalPage = (items = []) => {
    return Math.ceil((items || []).length / itemPerPage);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // LOADING COMPONENT
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f8fafc'
      }}>
        <style>
          {`
            .spring-loader {
              width: 60px;
              height: 60px;
              border: 6px solid #e2e8f0; /* Perbaikan typo 20x -> 6px agar lebih proporsional */
              border-top: 6px solid ${data1.warna || '#2563eb'};
              border-radius: 50%;
              animation: spin-spring 1s linear infinite;
            }
            @keyframes spin-spring {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div className="spring-loader"></div>
      </div>
    );
  }

  // DATA TIDAK ADA
  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '150px 20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Jurusan Tidak Ditemukan!</h1>
      </div>
    );
  }

  const menu = ['profil', 'teams', 'produk', 'artikel', 'gallery'];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* HERO */}
      <header
        style={{
          height: '350px',
          backgroundImage: `linear-gradient(to right, ${data1.warna}eb, ${data1.warna}40), url(${data1.heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          padding: '0 5%',
          color: 'white'
        }}
      >
        <div ref={heroTextRef} style={{ maxWidth: '600px' }}>
          <h4 style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', opacity: 0.9, margin: 0 }}>
            {data1.singkatan}
          </h4>
          <h1 style={{ fontSize: 'calc(1.8rem + 1vw)', margin: '10px 0', fontWeight: 'bold', lineHeight: '1.2' }}>
            {data1.nama}
          </h1>
        </div>
      </header>

      {/* NAV - Sekarang aman di HP karena bisa di-scroll horizontal jika menu kepanjangan */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          mdJustifyContent: 'center',
          gap: '20px',
          padding: '0 20px',
          background: '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none' // Sembunyikan scrollbar di Firefox
        }}
      >
        {menu.map((m) => (
          <button
            key={m}
            onClick={() => setTab(m)}
            style={{
              padding: '16px 5px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              color: tab === m ? data1.warna : '#64748b',
              borderBottom: tab === m ? `3px solid ${data1.warna}` : '3px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            {m}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ padding: '40px 5%', maxWidth: '1200px', margin: '0 auto', minHeight: '400px' }}>
        
        {/* ================= PROFIL ================= */}
        {tab === 'profil' && (
          <div className="animate-item" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <section style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h2 style={{ color: data1.warna, marginBottom: '15px', fontSize: '1.5rem' }}>Profil Jurusan</h2>
              <p style={{ lineHeight: '1.8', color: '#334155', margin: 0 }}>{data.deskripsi_profil}</p>
            </section>

            <section style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h2 style={{ color: data1.warna, marginBottom: '10px', fontSize: '1.5rem' }}>Visi</h2>
              <p style={{ color: '#334155', lineHeight: '1.7', marginBottom: '25px' }}>{data.visi}</p>
              
              <h2 style={{ color: data1.warna, marginBottom: '10px', fontSize: '1.5rem' }}>Misi</h2>
              {Array.isArray(data.misi) ? (
                <ul style={{ color: '#334155', lineHeight: '1.8', paddingLeft: '20px' }}>
                  {data.misi.map((m, i) => <li key={i} style={{ marginBottom: '5px' }}>{m}</li>)}
                </ul>
              ) : (
                <p style={{ color: '#334155', lineHeight: '1.7' }}>{data.misi}</p>
              )}
            </section>
          </div>
        )}

        {/* ================= TEAMS ================= */}
        {tab === 'teams' && (
          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {(data.teams || []).map((t, i) => (
              <div key={i} className="animate-item" style={{
                textAlign: 'center', padding: '20px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}>
                <img
                  src={t.foto ? `http://127.0.0.1:8000/storage/${t.foto}` : 'https://via.placeholder.com/150'}
                  alt={t.nama}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }}
                />
                <h3 style={{ fontSize: '1.1rem', margin: '5px 0' }}>{t.nama}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{t.jabatan}</p>
              </div>
            ))}
          </section>
        )}

        {/* ================= PRODUK ================= */}
        {tab === 'produk' && (
          <section>
            <h2 style={{ color: data1.warna, marginBottom: '25px', fontSize: '1.5rem' }}>Produk Unggulan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {paginateData(data.produks).map((pg, i) => (
                <div key={i} className="animate-item" style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <img
                    src={pg.foto ? `http://127.0.0.1:8000/storage/${pg.foto}` : 'https://via.placeholder.com/300'}
                    alt={pg.nama_produk}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>{pg.nama_produk}</h3>
                    {pg.admin_contact?.nomor_wa && (
                      <a
                        href={`https://wa.me/${pg.admin_contact.nomor_wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block', background: '#25D366', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem'
                        }}
                      >
                        Chat WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPage(data.produks)} setCurrentPage={setCurrentPage} color={data1.warna} />
          </section>
        )}

        {/* ================= ARTIKEL ================= */}
        {tab === 'artikel' && (
          <section>
            <h2 style={{ marginBottom: '25px', color: data1.warna, fontSize: '1.5rem' }}>Artikel Jurusan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {paginateData(data.articles).map((article, i) => (
                <div key={i} className="animate-item" style={{ borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <img
                    src={article.thumbnail ? `http://127.0.0.1:8000/storage/${article.thumbnail}` : 'https://via.placeholder.com/400x250'}
                    alt={article.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{article.title}</h3>
                    <div 
                      style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '15px' }}
                      dangerouslySetInnerHTML={{ __html: expandedArticle === i ? article.content : article.excerpt }}
                    />
                    <button
                      onClick={() => setExpandedArticle(expandedArticle === i ? null : i)}
                      style={{
                        background: 'none', border: 'none', color: data1.warna, fontWeight: 'bold', cursor: 'pointer', padding: 0, fontSize: '0.9rem'
                      }}
                    >
                      {expandedArticle === i ? 'Lihat Sedikit' : 'Lihat Selengkapnya'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPage(data.articles)} setCurrentPage={setCurrentPage} color={data1.warna} />
          </section>
        )}

        {/* ================= GALLERY ================= */}
        {tab === 'gallery' && (
          <section>
            <h2 style={{ marginBottom: '25px', color: data1.warna, fontSize: '1.5rem' }}>Gallery Jurusan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {paginateData(data.galleries).map((img, i) => (
                <div key={i} className="animate-item" style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <img
                    src={img.file_foto ? `http://127.0.0.1:8000/storage/${img.file_foto}` : 'https://via.placeholder.com/300'}
                    alt={img.judul_foto || "Gallery"}
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '15px' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#1e293b' }}>{img.judul_foto}</h4>
                  </div>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPage(data.galleries)} setCurrentPage={setCurrentPage} color={data1.warna} />
          </section>
        )}
      </main>

      {/* BUTTON SCROLL TOP */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '25px',
            right: '25px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            background: data1.warna,
            color: '#fff',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 999,
          }}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default JurusanPage;