import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';

import Shelf from './Shelf';
import SearchBooks from './SearchBooks';

const Main = props => {


  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf books={currentlyReading} title="Currently Reading" updateShelf={props.handleUpdateShelf} />
          <Shelf books={wantToRead} title="Want to Read" updateShelf={props.handleUpdateShelf} />
          <Shelf books={read} title="Read" updateShelf={props.handleUpdateShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}