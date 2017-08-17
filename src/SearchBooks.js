import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  static PropTypes = {
    updateShelf: PropTypes.func.isRequired
  };

  state = {
    query: '',
    foundBooks: []
  };

  updateQuery = query => {
    if (query) {
      // using alternate version of setState to fire the findBooks prop when state changes.
      this.setState(
        (previous, props) => ({ query: query.trim() }), 
        () => this.props.findBooks(this.state.query))
    } else {
      this.setState({query: ''});
    }
  }

  updateQuery2 = query => {
    if (query) {
      // using alternate version of setState to fire the findBooks prop when state changes.
      this.setState(
        (previous, props) => ({ query: query.trim() }), 
        () => this.findBooks(this.state.query))
    } else {
      this.setState({query: ''});
    }
  }

  // Search for books based on text input
  findBooks = query => BooksAPI.search(query, 20)
      .then(vals => this.setState({foundBooks: vals}));

  render() {

    const {updateShelf, bookShelfBooks} = this.props;

    const foundBooks = this.state.foundBooks;

    const foundBooksHasError = foundBooks.hasOwnProperty('error') ? true : false;
    const foundBooksIsEmpty = foundBooks.length === 0 ? true : false;
    let queryIsEmptyStr = this.state.query === "" ? true : false;

    // covers if response object has an error key, meaning no found books; or foundsBooks prop is empty; 
    // or the input field is blank
    const booksUnavailableForDisplay = foundBooksHasError || foundBooksIsEmpty || queryIsEmptyStr;

    const booksFound = books => books.map((book) => (
      <li key={book.id}>
        <Book bookData={book} updateShelf={updateShelf} />
      </li>
    ))

    const foundBookIsOnBookShelf = book => {
      let result = bookShelfBooks.find(bookShelfBook => bookShelfBook.id === book.id);
      let output = result === undefined ? false : result.shelf;
      return output;
    }

    const noBooksFound = (<li>No books found. Please try again</li>);

    const displayBooksMakeReady = () => {
      let updatedFoundBooks = [];
      foundBooks.forEach(book => {
        const updatedBook = book;
        updatedBook.shelf = foundBookIsOnBookShelf(book) || "none";
        updatedFoundBooks.push(updatedBook);
      })
      return booksFound(updatedFoundBooks);
    }

    
    let displayBooks = !booksUnavailableForDisplay ? displayBooksMakeReady() : noBooksFound;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery2(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{displayBooks}</ol>
        </div>
      </div>
    )

  }
}

export default SearchBooks;