import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf/>
        )} />
        <Route path='/search'  component={SearchBooks}  />
      </div>
    )
  }
}

export default BooksApp
