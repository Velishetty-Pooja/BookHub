import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css';

function BookCardDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setError] = useState("");
  const token = Cookies.get('jwt_token');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://apis.ccbp.in/book-hub/books/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }

        const data = await response.json();
        setBook(data.book_details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, token]);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  return (
    <div>
      <Header />
      <div className="book-details-container">
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

        <hr />

        <div className="book-description">
          <h3>About Author</h3>
          <p>{book.about_author}</p>

          <h3>About Book</h3>
          <p>{book.about_book}</p>
        </div>
      </div>
    </div>
  );
}

export default BookCardDetails;
