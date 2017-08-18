import React, { Component } from 'react';

import { Route } from 'react-router-dom';
// import  { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';

import './App.css';
// import Shelf from './Shelf';
import SearchBooks from './SearchBooks';
import Main from './Main';

class App extends Component {
/* Using the Babel transform-class-properties plugin,
  so no constructor is needed. Plus, by using the arrow
  function for class methods, no bind statement is needed.
  Using this protocol for all non-functional components.
*/
  state = {
    bookShelfBooks: [],
  };

  // Load all books on the bookshelf after App component mounts.
  componentDidMount() {
    BooksAPI.getAll().then(vals => {
      this.setState({bookShelfBooks: vals});
    });
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

  render() {

    // const filterBooksByShelf = shelf => {
    //   return this.state.bookShelfBooks.filter(book => book.shelf === shelf);
    // }

    // let currentlyReading = filterBooksByShelf("currentlyReading");
    // let read = filterBooksByShelf("read");
    // let wantToRead = filterBooksByShelf("wantToRead");

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Main
            updateShelf={this.handleUpdateShelf}
            bookShelfBooks={this.state.bookShelfBooks}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks 
            updateShelf={this.handleUpdateShelf}
            bookShelfBooks={this.state.bookShelfBooks}
          />
        )}/>
      </div>
    )
  }
}

export default App;
