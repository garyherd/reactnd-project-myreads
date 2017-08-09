import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Shelf from './Shelf';
import Book from './Book';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bookShelfBooks: []}
  }


  componentDidMount() {
    BooksAPI.getAll().then(vals => {
      this.setState({bookShelfBooks: vals});
    })
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
                <Shelf books={currentlyReading} title="Currently Reading"/>
                <Shelf books={wantToRead} title="Want to Read"/>
                <Shelf books={read} title="Read"/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}/>

        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default App;
