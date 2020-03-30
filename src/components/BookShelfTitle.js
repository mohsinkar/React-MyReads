import React, { Component } from 'react'

export default class BookShelfTitle extends Component {
    render() {
        return (
            <div className="list-books-title">
              <h1>{this.props.title}</h1>
            </div>
        )
    }
}
