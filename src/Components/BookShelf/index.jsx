import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import BookShelfNav from '../BookShelfNav';
import './index.css';

function BookShelf() {
  const { shelf } = useParams();
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = Cookies.get('jwt_token');
      if (!token) {
        setErrorMsg('You must be logged in to view this page.');
        setLoading(false);
        return;
      }

      try {
        const searchParam = searchText.trim();
        const url = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchParam}`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMsg(errorData.error || 'Failed to fetch books.');
        } else {
          const data = await response.json();
          setBooks(data.books || []);
        }
      } catch (error) {
        setErrorMsg('Something went wrong while fetching data.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchText, shelf]);

  return (
    <div>
      <Header />

      <div className="bookshelf-layout">
        <aside className="bookshelf-sidebar">
          <BookShelfNav />
        </aside>

        <main className="bookshelf-main">
          <div className="bookshelf-header">
            <h2>All Books</h2>
            <div className="bookshelf-search">
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <div className="bookshelf-list">
            {loading ? (
              <p>Loading...</p>
            ) : errorMsg ? (
              <p className="error-msg">{errorMsg}</p>
            ) : books.length === 0 ? (
              <p>No books found for your search.</p>
            ) : (
              <ul className="books-grid">
                {books.map((book) => (
                  <li key={book.id} className="book-card">
                    <img src={book.cover_pic} alt={book.title} className="book-cover" />
                    <h3 className="book-title">{book.title}</h3>
                    <p className="author-name">{book.author_name}</p>
                    <p className="rating">
                      Avg Rating <span role="img" aria-label="star">⭐</span> {book.rating}
                    </p>
                    <p className="status">
                      Status: <span className="status-value">{book.read_status}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default BookShelf;
