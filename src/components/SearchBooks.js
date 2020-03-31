import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelfBooks from './BookShelfBooks'
import { search } from '../BooksAPI'
import { update } from '../BooksAPI'


export default class SearchBooks extends Component {

    state = {
        query: "",
        books: [],
        libraryBooks: []
    }

    componentDidMount() {
     
        const { currentlyReading, wantToRead, read } =this.props.location.state.libraryBooks
        this.setState({
            libraryBooks: [...currentlyReading, ...wantToRead, ...read]
        })
    }

    changeHandler = (query) => {
        this.setState({
            query
        })
        if (query.length > 0) {
            search(query).then(res => {
                let bookShelf = res;
                bookShelf = bookShelf.map(obj => this.state.libraryBooks.find(o => o.id === obj.id) || obj);
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
                        <BookShelfBooks books={this.state.books} title="Search Results" selectionChanges={this.handleLibrarySelection} />
                    </div>
                </div>
            </div>
        )
    }
}
