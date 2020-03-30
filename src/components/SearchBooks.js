import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelfBooks from './BookShelfBooks'
import { search } from '../BooksAPI'
import { update } from '../BooksAPI'


export default class SearchBooks extends Component {

    state = {
        query: "",
        books: []
    }

    changeHandler = (query) => {
        this.setState({
            query
        })
        if (query.length > 0) {
            search(query).then(res => {
                const bookShelf = res;
                console.log(bookShelf)
                this.setState({
                    books: bookShelf
                });
            })
        } else {
            this.setState({
                books: []
            });
        }
    }

    handleLibrarySelection = (book, shelf) => {
        console.log(book, shelf)
        update(book, shelf).then(res => {
            this.props.history.push('/')
        })
    }


    render() {
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/"><button className="close-search">Close</button></Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => (this.changeHandler(event.target.value))} />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <BookShelfBooks books={this.state.books} shelf="none" title="Search Results"  selectionChanges={this.handleLibrarySelection}  />
                    </div>
                </div>
            </div>
        )
    }
}
