import {Component} from 'react'
import { IoSearch } from "react-icons/io5";

import SearchResults from '../SearchResults';
import Source from '../Source'
import { HomeBgContainer, Input, SearchBgContainer, SearchButton, TagLine1, TagLine2 } from './styledComponent'

class Home extends Component{
    state = {
        author: '',
        genre: '',
        publishedYear: '',
        books: [],
        displaySearchResults: false,
    }

    fetchBooks = async () => {
        this.setState({displaySearchResults: true})
        const {author, genre, publishedYear} = this.state 

        const options = {
            method: 'GET'
        }

        try{
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/books?author=${author}&genre=${genre}&publishedYear=${publishedYear}`, options);
            const data = await response.json()
            this.setState({books: data})

        } catch (error) {
            console.log(error)
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
                ...prevState,
                [name]: value
        }));
    }    

    render(){
        const {author, genre, publishedYear} = this.state

        return(
            <Source>
                <HomeBgContainer>
                    <TagLine1>From Shelves to Screens - Books Managed with Ease.</TagLine1>
                    <TagLine2>Find Your Next Favorite Book!</TagLine2>
                    <SearchBgContainer>
                        <label>Author
                        <Input 
                            type="text"
                            name="author"
                            value={author}
                            placeholder="Search by author"
                            onChange={this.handleInputChange}
                        />
                        </label>

                        <label>Genre
                        <Input 
                            type="text"
                            name="genre"
                            value={genre}
                            placeholder="Search by genre"
                            onChange={this.handleInputChange}
                        />
                        </label>

                        <label>Published Year
                        <Input 
                            type="text"
                            name="publishedYear"
                            value={publishedYear}
                            placeholder="Search by published year"
                            onChange={this.handleInputChange}
                        />
                        </label>

                        <SearchButton onClick={this.fetchBooks}> <IoSearch size='20' /> Search </SearchButton>
                    </SearchBgContainer>

                    {this.state.displaySearchResults && <SearchResults books={this.state.books}/>}
                </HomeBgContainer>
            </Source>
            
        )
    }
}
 
export default Home