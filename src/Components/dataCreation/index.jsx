import { useState, useEffect } from 'react';

function DataCreation() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    setBooks(storedBooks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      title,
      author,
      rating,
      imageUrl,
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('myBooks', JSON.stringify(updatedBooks));

    setTitle('');
    setAuthor('');
    setRating('');
    setImageUrl('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          min="1"
          max="5"
          required
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          required
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Submit
        </button>
      </form>

      <h3 style={{ marginTop: '2rem' }}>Saved Books</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ width: '150px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={book.imageUrl} alt={book.title} style={{ width: '100%', height: 'auto' }} />
            <h4>{book.title}</h4>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
            <button >Delete</button>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataCreation;
