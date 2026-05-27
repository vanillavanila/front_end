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
        console.log(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [id]);

  // HERO ANIMATION
  useEffect(() => {

    if (heroTextRef.current) {

      gsap.fromTo(
        heroTextRef.current,
        {
          y: 80,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "bounce.out"
        }
      );

    }

  }, [data]);

  // CONTENT ANIMATION
  useEffect(() => {

    if (contentRef.current) {

      const items =
        contentRef.current.querySelectorAll('.animate-item');

      gsap.fromTo(
        items,
        {
          opacity: 0,
          x: (i) => i % 2 === 0 ? -100 : 100
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        }
      );

    }

  }, [tab, data]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 2;

  useEffect(() => {
    setCurrentPage(1);
  }, [tab]);

  const paginateData = (items = []) => {
    const start = 
          (currentPage - 1 ) * itemPerPage;
    return items.slice(
      start,
      start + itemPerPage
    );
  }

  const totalPage = (items = []) =>{
   return Math.ceil(items.length / itemPerPage)
  }

  // scroll otomatis
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {

  const handleScroll = () => {

    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };

}, []);

const scrollToTop = () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

};

  // LOADING
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
              width: 150px;
              height: 150px;
              border: 20x solid #e2e8f0;
              border-top: 20px solid ${data1.warna || '#2563eb'};
              border-radius: 50%;
              animation: spin-spring 1s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
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
      <h1 style={{ textAlign: 'center', padding: '150px' }}>
        Jurusan Tidak Ditemukan!
      </h1>
    );
  }

  const menu = [
    'profil',
    'teams',
    'produk',
    'artikel',
    'gallery'
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* HERO */}
      <header
        style={{
          height: '400px',
          backgroundImage: `
            linear-gradient(to right, ${data1.warna}, transparent),
            url(${data1.heroImg})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10%',
          color: 'white'
        }}
      >

        <div ref={heroTextRef}>

          <h4 style={{ letterSpacing: '5px' }}>
            {data1.singkatan}
          </h4>

          <h1
            style={{
              fontSize: '2.1rem',
              margin: '10px 0'
            }}
          >
            {data1.nama}
          </h1>

        </div>

      </header>

      {/* NAV */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          padding: '14px',
          background: '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >

        {menu.map((m) => (

          <button
            key={m}
            onClick={() => setTab(m)}
            style={{
              padding: '18px 0',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: tab === m
                ? data1.warna
                : '#999',
              borderBottom:
                tab === m
                  ? `3px solid ${data1.warna}`
                  : '3px solid transparent'
            }}
          >
            {m}
          </button>

        ))}

      </nav>

      {/* CONTENT */}
      <main
        ref={contentRef}
        style={{
          padding: '50px 10%',
          minHeight: '400px'
        }}
      >

        {/* ================= PROFIL ================= */}
        {tab === 'profil' && (

          <div className="animate-item">

            <section
              style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                marginBottom: '30px'
              }}
            >

              <h2
                style={{
                  color: data1.warna,
                  marginBottom: '20px'
                }}
              >
                Profil Jurusan
              </h2>

              <p
                style={{
                  lineHeight: '1.9',
                  color: '#555'
                }}
              >
                {data.deskripsi_profil}
              </p>

            </section>

            <section
              style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >

              <h2 style={{ color: data1.warna }}>
                Visi
              </h2>

              <p>{data.visi}</p>

              <h2
                style={{
                  color: data1.warna,
                  marginTop: '30px'
                }}
              >
                Misi
              </h2>

              {Array.isArray(data.misi) ? (
                <ul>
                  {data.misi.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              ) : (
                <p>{data.misi}</p>
              )}

            </section>

          </div>

        )}

        {/* ================= TEAMS ================= */}
        {tab === 'teams' && (

          <section
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '25px'
            }}
          >

            {data.teams?.map((t, i) => (

              <div
                key={i}
                className="animate-item"
                style={{
                  textAlign: 'center',
                  padding: '25px',
                  borderRadius: '15px',
                  background: '#fff',
                  boxShadow:
                    '0 5px 15px rgba(0,0,0,0.08)'
                }}
              >

                <img
                  src={
                    t.foto
                      ? `http://127.0.0.1:8000/storage/${t.foto}`
                      : 'https://via.placeholder.com/150'
                  }
                  alt={t.nama}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '15px'
                  }}
                />

                <h3>{t.nama}</h3>

                <p style={{ color: '#666' }}>
                  {t.jabatan}
                </p>

              </div>

            ))}

          </section>

        )}

        {/* ================= PRODUK ================= */}
       {tab === 'produk' && (

  <section>

    <h2
      style={{
        color: data1.warna,
        marginBottom: '30px'
      }}
    >
      Produk Unggulan
    </h2>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '25px'
      }}
    >

      {paginateData(data.produks)?.map((pg, i) => (

        <div
          key={i}
          className="animate-item"
          style={{
            background: '#fff',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow:
              '0 5px 15px rgba(0,0,0,0.08)'
          }}
        >

          <img
            src={
              pg.foto
                ? `http://127.0.0.1:8000/storage/${pg.foto}`
                : 'https://via.placeholder.com/300'
            }
            alt={pg.nama_produk}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover'
            }}
          />

          <div style={{ padding: '20px' }}>

            <h3>{pg.nama_produk}</h3>

            <a
              href={`https://wa.me/${pg.admin_contact?.nomor_wa}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '10px',
                background: '#25D366',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Chat WhatsApp
            </a>

          </div>

        </div>

      ))}

    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalPage(data.produks)}
      setCurrentPage={setCurrentPage}
      color={data1.warna}
    />

  </section>

)}

        {/* ================= ARTIKEL ================= */}
       {tab === 'artikel' && (

  <section>

    <h2
      style={{
        marginBottom: '30px',
        color: data1.warna
      }}
    >
      Artikel Jurusan
    </h2>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px'
      }}
    >

      {paginateData(data.articles)?.map((article, i) => (

        <div
          key={i}
          className="animate-item"
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            boxShadow:
              '0 5px 15px rgba(0,0,0,0.1)'
          }}
        >

          <img
            src={
              article.thumbnail
                ? `http://127.0.0.1:8000/storage/${article.thumbnail}`
                : 'https://via.placeholder.com/400x250'
            }
            alt={article.title}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover'
            }}
          />

          <div style={{ padding: '20px' }}>

            <h3>{article.title}</h3>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  expandedArticle === i
                    ? article.content
                    : article.excerpt
              }}
            />

            <button
              onClick={() =>
                setExpandedArticle(
                  expandedArticle === i
                    ? null
                    : i
                )
              }
            >
              {expandedArticle === i
                ? 'Lihat Sedikit'
                : 'Lihat Selengkapnya'}
            </button>

          </div>

        </div>

      ))}

    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalPage(data.articles)}
      setCurrentPage={setCurrentPage}
      color={data1.warna}
    />

  </section>

)}

        {/* ================= GALLERY ================= */}
       {tab === 'gallery' && (

  <section>

    <h2
      style={{
        marginBottom: '30px',
        color: data1.warna
      }}
    >
      Gallery Jurusan
    </h2>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '25px'
      }}
    >

      {paginateData(data.galleries)?.map((img, i) => (

        <div
          key={i}
          className="animate-item"
          style={{
            background: '#fff',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow:
              '0 5px 15px rgba(0,0,0,0.08)'
          }}
        >

          <img
            src={
              img.file_foto
                ? `http://127.0.0.1:8000/storage/${img.file_foto}`
                : 'https://via.placeholder.com/300'
            }
            alt="Gallery"
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover'
            }}
          />

          <div style={{ padding: '15px' }}>
            <h4>{img.judul_foto}</h4>
          </div>

        </div>

      ))}

    </div>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPage(data.galleries)}
      setCurrentPage={setCurrentPage}
      color={data1.warna}
    />
  </section>
)}
      </main>

{/* BUTTON SCROLL TOP */}
{showScrollTop && (

  <button
    onClick={scrollToTop}
    style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '55px',
      height: '55px',
      borderRadius: '50%',
      border: 'none',
      background: data1.warna,
      color: '#fff',
      fontSize: '24px',
      cursor: 'pointer',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      zIndex: 999,
      transition: '0.3s'
    }}
  >
    <FaArrowUp />
  </button>

)}

</div>

  );
};
export default JurusanPage;