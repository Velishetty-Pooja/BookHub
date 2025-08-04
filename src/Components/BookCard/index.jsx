import React from 'react'
import { useNavigate } from 'react-router-dom';
import './index.css'
function BookCard({ book }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book-hub/book/${book.id}`);
  };

  return (
    <div onClick={handleCardClick} style={{ cursor: 'pointer' }} className="card">
      <li key={book.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
             <img className="book" src={book.cover_pic} alt={book.title}/>
             <p>author:{book.author_name}</p>
             <p>title:{book.title}</p>
            
            </li>
    </div>
  )
}

export default BookCard
