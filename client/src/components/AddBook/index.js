import { Component } from "react";
import { toast } from 'react-toastify';

import Source from "../Source";
import { AddBookBgContainer, AddBookButton, Form, Input } from "./styledComponent";

class AddBook extends Component{
    state = {
        title: '',
        author: '',
        genre: '',
        pages: '',
        published_date: ''
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
                ...prevState,
                [name]: value
        }));
    }

    addBook = async event => {
        event.preventDefault();
    
        const pendingToast = toast.loading("Adding Book...");
    
        const { ...bookData } = this.state;
    
        try{
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            };
    
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/add-book`, options);
          const data = await response.json()
    
          if (!response.ok) {
            toast.update(pendingToast, {
                render: data.failure,
                type: "error",
                isLoading: false,
                autoClose: 4000,  
            });
            
            return
        }
    
        toast.update(pendingToast, {
            render: data.success,
            type: "success",
            isLoading: false,
            autoClose: 4000,  
        });
    
        this.setState({title: '', author: '', genre: '', pages: '', published_date: ''})
    
        } catch (error) {
          toast.update(pendingToast, {
              render: "Network error. Please try again later.",
              type: "error",
              isLoading: false,
              autoClose: 4000,  
          });
      }
      };

    render(){
        const {title, author, genre, pages, published_date} = this.state

        return(
            <Source>
            <AddBookBgContainer>
                <Form onSubmit={this.addBook}>
                    <label>Title
                    <Input 
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Enter Book Title"
                        required
                        onChange={this.handleInputChange}
                    />
                    </label>

                    <label>Author
                    <Input 
                        type="text"
                        name="author"
                        value={author}
                        placeholder="Enter Author name"
                        required
                        onChange={this.handleInputChange}
                    />
                    </label>

                    <label>Genre
                    <Input 
                        type="text"
                        name="genre"
                        value={genre}
                        placeholder="Enter Genre"
                        required
                        onChange={this.handleInputChange}
                    />
                    </label>

                    <label>Pages
                    <Input 
                        type="text"
                        name="pages"
                        value={pages}
                        placeholder="Enter Pages count"
                        required
                        onChange={this.handleInputChange}
                    />
                    </label>

                    <label>Published Date
                    <Input 
                        type="date"
                        name="published_date"
                        value={published_date}
                        placeholder="Enter Published date"
                        required
                        onChange={this.handleInputChange}
                    />
                    </label>

                    <AddBookButton type="submit">Add</AddBookButton>
                </Form>
            </AddBookBgContainer>
            </Source>
        )
        

    }
}

export default AddBook