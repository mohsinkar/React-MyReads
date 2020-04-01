import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BookShelfBooks from './BookShelfBooks'
import { search } from '../BooksAPI'
import { update } from '../BooksAPI'


function SearchBooks(props) {

    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [libraryBooks] = useState([...props.location.state.libraryBooks.currentlyReading, ...props.location.state.libraryBooks.wantToRead, ...props.location.state.libraryBooks.read]);

    const changeHandler = (query) => {
        setQuery(query)
        if (query.length > 0) {
            search(query).then(res => {
                let bookShelf = res;
                if (bookShelf.length > 0) {
                    bookShelf = bookShelf.map(obj => libraryBooks.find(o => o.id === obj.id) || obj);
                    setBooks(bookShelf)
                }
            })
        } else {
            setBooks([])
        }
    }

    const handleLibrarySelection = (book, shelf) => update(book, shelf).then(res => props.history.push('/'))

    return (
        <div>
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => (changeHandler(event.target.value))} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelfBooks books={books} title="Search Results" selectionChanges={handleLibrarySelection} />
                </div>
            </div>
        </div>
    )
}
export default SearchBooks
