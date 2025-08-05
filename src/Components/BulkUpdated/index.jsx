import React, { useEffect, useState } from 'react';

function BulkUpdated() {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('mybooks')) || [];
    setBooks(storedBooks);
  }, []);

  const handleSelectAll = () => {
    const allBookIds = selectAll ? [] : books.map((book) => book.id);
    setSelectedBooks(allBookIds);
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (bookId) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleSubmit = () => {
    const updatedBooks = books.map((book) =>
      selectedBooks.includes(book.id)
        ? { ...book, updated: true }
        : book
    );

    setBooks(updatedBooks);
    localStorage.setItem('mybooks', JSON.stringify(updatedBooks)); 
    alert('Book status updated!');
    setSelectedBooks([]);
    setSelectAll(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Bulk Update Books</h2>

      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <span style={{ marginLeft: '8px' }}>Select All</span>
      </label>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={selectedBooks.includes(book.id)}
                onChange={() => handleCheckboxChange(book.id)}
              />
              <span style={{ marginLeft: '8px' }}>{book.title}</span>
              <span
                style={{
                  marginLeft: '10px',
                  color: book.updated ? 'green' : 'red',
                }}
              >
                {book.updated ? ' Updated' : 'Not Updated'}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit} disabled={selectedBooks.length === 0}>
         Submit Changes
      </button>
    </div>
  );
}

export default BulkUpdated;
