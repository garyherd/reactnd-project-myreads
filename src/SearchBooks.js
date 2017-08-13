import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './App.css';
import Book from './Book';

class SearchBooks extends Component {

  static PropTypes = {
    findBooks: PropTypes.func.isRequired
  };

  state = {
    query: '',
  };

  updateQuery = query => {
    if (query) {
      this.setState(
        (previous, props) => ({ query: query.trim() }), 
        () => this.props.findBooks(this.state.query))
    } else {
      this.setState({query: ''});
    }
  }


  render() {

    const {foundBooks, updateShelf} = this.props;

    const foundBooksHasError = books => books.error ? true : false;

    const booksFound = books => books.map((book) => (
      <li key={book.id}>
        <Book bookData={book} updateShelf={updateShelf} />
      </li>
    ))

    const noBooksFound = (<li>No books found. Please try again</li>);

    let displayBooks = !foundBooksHasError(foundBooks) ? booksFound(foundBooks) : noBooksFound;

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
              onChange={event => this.updateQuery(event.target.value)}
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