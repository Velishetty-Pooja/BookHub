import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Cookies from 'js-cookie';
import BookCard from '../BookCard';
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
        console.error(error);
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
          <div className="bookshelf-search">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
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
                  <div className="book-main">
          <img src={book.cover_pic} alt={book.title} className="book-image" />
          <div className="book-info">
            <h2>{book.title}</h2>
            <p className="author-name">{book.author_name}</p>
            <p className="rating">
              Avg Rating <span role="img" aria-label="star">⭐</span> {book.rating}
            </p>
            <p className="status">
              Status : <span className="status-value">{book.read_status}</span>
            </p>
          </div>
        </div>
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
