import React from 'react';
import Book from './Book';
import './App.css';

const Shelf = (props) => {
/* No state or event handlers needed, so using a function component */

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


