import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import  { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';

import './App.css';
import Shelf from './Shelf';
import SearchBooks from './SearchBooks';

class App extends Component {
/* Using the Babel transform-class-properties plugin,
  so no constructor is needed. Plus, by using the arrow
  function for class methods, no bind statement is needed.
  Using this protocol for all non-functional components.
*/
  state = {
    bookShelfBooks: [],
    foundBooks: []
  };

  // Load all books on the bookshelf after App component mounts.
  componentDidMount() {
    BooksAPI.getAll().then(vals => {
      this.setState({bookShelfBooks: vals});
    });
    this.setState({foundBooks: []});
  }

  /* All calls to, and responses from, the BooksAPI are handled in
    this component. Responses are placed into the state of the App
    component, and sent to child components via props
  */

  // Change shelf for a book (i.e. Currently Reading to Read, etc.)
  handleUpdateShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
      .then(vals => BooksAPI.getAll())
      .then(vals => this.setState({bookShelfBooks: vals}));
  }

  // Search for books based on text input
  handleFindBooks = query => {
    BooksAPI.search(query, 50)
      .then(vals => this.setState({foundBooks: vals}))
  }

  render() {

    let currentlyReading = this.state.bookShelfBooks.filter(book => book.shelf === "currentlyReading");
    let read = this.state.bookShelfBooks.filter(book => book.shelf === "read");
    let wantToRead = this.state.bookShelfBooks.filter(book => book.shelf === "wantToRead");

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={currentlyReading} title="Currently Reading" updateShelf={this.handleUpdateShelf}/>
                <Shelf books={wantToRead} title="Want to Read" updateShelf={this.handleUpdateShelf}/>
                <Shelf books={read} title="Read" updateShelf={this.handleUpdateShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks 
            findBooks={this.handleFindBooks} 
            foundBooks={this.state.foundBooks} 
            updateShelf={this.handleUpdateShelf}
            bookShelfBooks={this.state.bookShelfBooks}
          />
        )}/>
      </div>
    )
  }
}

export default App;
