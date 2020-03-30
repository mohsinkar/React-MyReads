import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AddBooks extends Component {
    render() {
        
       
        return (
            <div className="open-search">
                <Link to={{ pathname: "/search", selectionHandler: this.props.selectionChanges}}>
                    <button>Add a book</button>
                </Link>
            </div>
        )
    }
}