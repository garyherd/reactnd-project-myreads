import React from 'react';
import Book from './Book';

import PropTypes from 'prop-types';

const Shelf = (props) => {
/* No state or event handlers needed, so using a function component */

  const propTypes = {
    updateShelf: PropTypes.func.isRequired,
    title: PropTypes.string,
    books: PropTypes.shape({
      id: PropTypes.string
    })
  };

  const currentShelf = props.books.map((book) =>
    <li key={book.id}>
      <Book bookData={book} updateShelf={props.updateShelf} />
    </li>
  );
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currentShelf}
        </ol>
      </div>
    </div>
  )
}

export default Shelf;


