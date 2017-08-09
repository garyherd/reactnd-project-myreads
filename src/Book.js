import React, { Component } from 'react';
import './App.css';

const Book = (props) => {

  const coverStyle = {
    width: 128,
    height: 193,
    backgroundImage: `url(${props.bookData.imageLinks.thumbnail})`
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={coverStyle}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.bookData.title}</div>
      <div className="book-authors">{props.bookData.authors.join()}</div>
    </div>
  )
}

export default Book;