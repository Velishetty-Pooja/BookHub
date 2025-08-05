import { useState, useEffect } from 'react';

function DataCreation() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [previousData, setPreviousData] = useState(null); 

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    setBooks(storedBooks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      
      const updatedBooks = books.map(book =>
        book.id === editingId
          ? { ...book, title, author, rating, imageUrl }
          : book
      );
      setBooks(updatedBooks);
      localStorage.setItem('myBooks', JSON.stringify(updatedBooks));
      setEditingId(null);
      setPreviousData(null);
    } else {
     const newBook = {
        id: Date.now(),
        title,
        author,
        rating,
        imageUrl,
         updated: false, 
      };

      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      localStorage.setItem('myBooks', JSON.stringify(updatedBooks));
    }

    setTitle('');
    setAuthor('');
    setRating('');
    setImageUrl('');
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    const deletedBook = books.find((book) => book.id === id);

    setBooks(updatedBooks);
    localStorage.setItem('myBooks', JSON.stringify(updatedBooks));

    const history = JSON.parse(localStorage.getItem('deletedBooks')) || [];
    history.push(deletedBook);
    localStorage.setItem('deletedBooks', JSON.stringify(history));
  };

  const handleEdit = (book) => {
    setPreviousData(book); 
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setRating(book.rating);
    setImageUrl(book.imageUrl);
  };

  const handleCancel = () => {
    setEditingId(null);
    setPreviousData(null);
    setTitle('');
    setAuthor('');
    setRating('');
    setImageUrl('');
  };

  const handleReset = () => {
    if (previousData) {
      setTitle(previousData.title);
      setAuthor(previousData.author);
      setRating(previousData.rating);
      setImageUrl(previousData.imageUrl);
    }
  };

  const handleUpdateStatus = () => {
    const updateMap = {};
    books.forEach(book => {
      updateMap[book.id] = true;
    });
    localStorage.setItem('updateStatus', JSON.stringify(updateMap));
    alert("All books marked as updated");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{editingId ? 'Edit Book' : 'Add a New Book'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Title" value={title} required onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} required onChange={(e) => setAuthor(e.target.value)} />
        <input type="number" placeholder="Rating (1-5)" value={rating} min="1" max="5" required onChange={(e) => setRating(e.target.value)} />
        <input type="url" placeholder="Image URL" value={imageUrl} required onChange={(e) => setImageUrl(e.target.value)} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">{editingId ? 'Save' : 'Submit'}</button>
          {editingId && (
            <>
              <button type="button" onClick={handleReset}>Reset</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      </form>

      <h3 style={{ marginTop: '2rem' }}>Saved Books</h3>
      <button onClick={handleUpdateStatus} style={{ marginBottom: '10px' }}>Select All → Update All</button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ width: '150px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={book.imageUrl} alt={book.title} style={{ width: '100%', height: 'auto' }} />
            <h4>{book.title}</h4>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
            <button onClick={() => handleEdit(book)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataCreation;
