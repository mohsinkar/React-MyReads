import React, { Component } from 'react'
import BookShelfTitle from './BookShelfTitle'
import BookShelfBooks from './BookShelfBooks'
import { getAll } from '../BooksAPI'
import AddBooks from './AddBooks'

export default class BookShelf extends Component {

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
    }

    componentDidMount() {
        getAll().then(res => {
            const bookShelf = res;
            //console.log(bookShelf);
            this.setState({
                currentlyReading: bookShelf.filter(book => book.shelf === "currentlyReading"),
                wantToRead: bookShelf.filter(book => book.shelf === "wantToRead"),
                read: bookShelf.filter(book => book.shelf === "read")
            });
        })
    }

    render() {
        return (
            <div className="list-books">
                <BookShelfTitle title='Reading Library' />
                <div className="list-books-content">
                    <div>
                        <BookShelfBooks books={this.state.currentlyReading} shelf="currentlyReading" title="Currently Reading" />
                        <BookShelfBooks books={this.state.wantToRead} shelf="wantToRead" title="Want to Read" />
                        <BookShelfBooks books={this.state.read} shelf="read" title="Read" />
                    </div>
                </div>
                <AddBooks />
            </div>
        )
    }
}
