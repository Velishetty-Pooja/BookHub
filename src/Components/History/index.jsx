import React, { useEffect, useState } from 'react';

function History() {
  const [deletedBooks, setDeletedBooks] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('deletedBooks')) || [];
    setDeletedBooks(storedHistory);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>📚 Deleted Book History</h2>
      {deletedBooks.length === 0 ? (
        <p>No books have been deleted yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {deletedBooks.map((book) => (
            <div
              key={book.id}
              style={{
                width: '200px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={book.imageUrl}
                alt={book.title}
                style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
              />
              <h4 style={{ margin: '10px 0 5px' }}>{book.title}</h4>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Rating:</strong> {book.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
