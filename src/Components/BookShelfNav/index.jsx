import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const bookShelf = [
  { key: 'ALL', label: 'All' },
  { key: 'READ', label: 'Read' },
  { key: 'CURRENTLY_READING', label: 'Currently Reading' },
  { key: 'WANT_TO_READ', label: 'Want to Read' },
];

function BookShelfNav() {
  return (
    <div className="shelf-nav">
      <h3>Bookshelves</h3>
      <ul>
        {bookShelf.map((shelf) => (
          <li key={shelf.key}>
            <NavLink
              to={`/bookshelf/${shelf.key}`}
              activeClassName="active-shelf"
              className="shelf-link"
            >
              {shelf.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookShelfNav;
