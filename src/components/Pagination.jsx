import React from 'react';

const Pagination = ({
  currentPage,
  totalPage,
  setCurrentPage,
  color = '#2563eb'
}) => {

  if (totalPage <= 1) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        marginTop: '40px',
        flexWrap: 'wrap'
      }}
    >

      {/* PREV */}
      <button
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        disabled={currentPage === 1}
        style={{
          padding: '10px 18px',
          border: 'none',
          borderRadius: '8px',
          background: color,
          color: '#fff',
          cursor:
            currentPage === 1
              ? 'not-allowed'
              : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1
        }}
      >
        Prev
      </button>

      {/* PAGE NUMBER */}
      {[...Array(totalPage)].map((_, i) => {

        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background:
                currentPage === page
                  ? color
                  : '#e5e7eb',
              color:
                currentPage === page
                  ? '#fff'
                  : '#333',
              fontWeight: 'bold'
            }}
          >
            {page}
          </button>
        );

      })}

      {/* NEXT */}
      <button
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        disabled={currentPage === totalPage}
        style={{
          padding: '10px 18px',
          border: 'none',
          borderRadius: '8px',
          background: color,
          color: '#fff',
          cursor:
            currentPage === totalPage
              ? 'not-allowed'
              : 'pointer',
          opacity:
            currentPage === totalPage
              ? 0.5
              : 1
        }}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;