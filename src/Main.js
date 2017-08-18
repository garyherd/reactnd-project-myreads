import React from 'react';

// import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

import Shelf from './Shelf';
// import SearchBooks from './SearchBooks';

const Main = props => {

  const filterBooksByShelf = shelf => {
    return props.bookShelfBooks.filter(book => book.shelf === shelf);
  }

  let currentlyReading = filterBooksByShelf("currentlyReading");
  let read = filterBooksByShelf("read");
  let wantToRead = filterBooksByShelf("wantToRead");


  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf books={currentlyReading} title="Currently Reading" updateShelf={props.updateShelf} />
          <Shelf books={wantToRead} title="Want to Read" updateShelf={props.updateShelf} />
          <Shelf books={read} title="Read" updateShelf={props.updateShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

Main.propTypes = {
  updateShelf: PropTypes.func.isRequired,
  bookShelfBooks: PropTypes.array
}

export default Main;