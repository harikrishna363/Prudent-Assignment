import { Component } from "react"
import { withRouter } from 'react-router-dom'; 

const { SearchResultsContainer, BooksContainer, Book } = require("./styledComponent")

class SearchResults extends Component {

    handleBookClick = (book_id) => {
        const { history } = this.props; 
        history.push(`/book-details/${book_id}`);
    }

    renderBook = (book) => (
        <Book key={book.book_id} onClick={() => this.handleBookClick(book.book_id)}>
            <h3>{book.title}</h3>
            <p>{book.author_name}</p>
            <p>{book.genre_name}</p>
            <p>{book.published_date}</p>
        </Book>
    )

    render(){
        const {books} = this.props

        return(
            <SearchResultsContainer>
                <BooksContainer>
                    {books.map(book => this.renderBook(book))}
                </BooksContainer>
            </SearchResultsContainer>
        )
    }

    
}

export default withRouter(SearchResults)