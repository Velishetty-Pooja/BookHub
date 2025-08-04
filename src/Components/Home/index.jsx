import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Cookies from 'js-cookie';
import BookCard from '../BookCard';
import './index.css'; // Add your styles here

function Home() {
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      const token = Cookies.get('jwt_token');
      if (!token) {
        setErrorMsg('You must be logged in to view this page.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://apis.ccbp.in/book-hub/top-rated-books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMsg(errorData.error || 'Failed to fetch books.');
        } else {
          const data = await response.json();
          setBooks(data.books);
        }
      } catch (error) {
        setErrorMsg('Something went wrong while fetching data.');
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedBooks();
  }, []);

  return (
    <div>
      <Header />

      <div className="home-container">
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-subheading">
          You are in the right place. Tell us what titles or genres you have enjoyed in the past, and we will give you surprisingly insightful recommendations.
        </p>

        <div className="carousel-container">
          <div className="carousel-header">
            <h2>Top Rated Books</h2>
            <button className="find-books-btn">Find Books</button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : errorMsg ? (
            <p style={{ color: 'red' }}>{errorMsg}</p>
          ) : books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <ul className="book-list">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
