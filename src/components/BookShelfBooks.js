import React, { Component } from 'react'
import Message from './Message'

export default class BookShelfBooks extends Component {

    onChangeHandler = (selection) => {
        console.log(selection);
    }

    render() {
        
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                {this.props.books.length > 0 ?
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            {book.imageLinks &&
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}"` }}></div>
                                            }
                                            <div className="book-shelf-changer">
                                                <select onChange={(event) => (this.props.selectionChanges(book,event.target.value))} value={typeof book.shelf === "undefined" ? 'none' : book.shelf} >
                                                    <option value="move" disabled>{book.shelf}</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title} </div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    : <Message msg='No Books Available' />}
            </div>
        )
    }
}
