import { Component } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from 'react-toastify';

import { BookDetailsBgContainer, BookDetailsCard, CancelButton, DeleteButton, FlexContainer, Input, SaveButton } from "./styledComponent";

import Source from "../Source";

class BookDetails extends Component {
    state = {
        isLoading: true,
        bookId: this.props.match.params.bookId,
        bookInfo: {},
        originalBookInfo: {},
        isEdited: false,
    };

    componentDidMount() {
        this.fetchBook();
    }

    fetchBook = async () => {
        const { bookId } = this.state;

        const options = {
            method: "GET",
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/book-details/${bookId}`, options);
            const data = await response.json();

            this.setState({ bookInfo: data, originalBookInfo: data, isLoading: false });
        } catch (error) {
            console.log(error);
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState((prevState) => ({
            bookInfo: {
                ...prevState.bookInfo,
                [name]: value,
            },
            isEdited: true
        }));
    };

    handleSaveChanges = async () => {
        const { bookInfo } = this.state;
        console.log(bookInfo)
        const pendingToast = toast.loading(`Saving Changes...`);

        try {         
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookInfo),
            };

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/update-book`, options );
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

            this.setState({isEdited: false})

            toast.update(pendingToast, {
                render: data.success,
                type: "success",
                isLoading: false,
                autoClose: 4000, 
            });

            this.fetchBook();

        } catch (error) {
            toast.update(pendingToast, {
                render: "Network error. Please try again later.",
                type: "error",
                isLoading: false,
                autoClose: 4000, 
                hideProgressBar:false 
            });        
        }
    };

    handleCancelChanges = () => {
        this.setState(prevState => ({
            bookInfo: { ...prevState.originalBookInfo },
            isEdited: false,
        }));
    };

    handleDeleteBook = async () => {
        const pendingToast = toast.loading("Deleting Book...");
    
        try {
            const options = {
                method: "DELETE",
            };
    
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/delete-book/${this.state.bookId}`, options);
            const data = await response.json();
    
            if (!response.ok) {
                toast.update(pendingToast, {
                    render: data.failure,
                    type: "error",
                    isLoading: false,
                    autoClose: 4000,
                });
    
                return;
            }
    
            toast.update(pendingToast, {
                render: data.success,
                type: "success",
                isLoading: false,
                autoClose: 4000,
            });
    
            this.props.history.goBack();
    
        } catch (error) {
            toast.update(pendingToast, {
                render: "Network error. Please try again later.",
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Source>
                    <BookDetailsBgContainer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Oval
                            visible={true}
                            height="40"
                            width="40"
                            color="#3498DB"
                            secondaryColor="#3498DB"
                            ariaLabel="oval-loading"
                        />
                    </BookDetailsBgContainer>
                </Source>
            );
        }

        const { bookInfo } = this.state;

        return (
            <Source>
                <BookDetailsBgContainer>
                    <BookDetailsCard>
                        <label>
                            Title
                            <Input
                                type="text"
                                name="title"
                                value={bookInfo.title || ""}
                                onChange={this.handleInputChange}
                            />
                        </label>

                        <label>
                            Author
                            <Input
                                type="text"
                                name="author"
                                value={bookInfo.author || ""}
                                onChange={this.handleInputChange}
                            />
                        </label>

                        <label>
                            Genre
                            <Input
                                type="text"
                                name="genre"
                                value={bookInfo.genre || ""}
                                onChange={this.handleInputChange}
                            />
                        </label>

                        <label>
                            Pages
                            <Input
                                type="text"
                                name="pages"
                                value={bookInfo.pages || ""}
                                onChange={this.handleInputChange}
                            />
                        </label>

                        <label>
                            Published Date
                            <Input
                                type="date"
                                name="published_date"
                                value={bookInfo.published_date || ""}
                                onChange={this.handleInputChange}
                            />
                        </label>

                        <FlexContainer>
                            <SaveButton disabled={!this.state.isEdited} onClick={this.handleSaveChanges}>Save Changes</SaveButton>
                            <CancelButton disabled={!this.state.isEdited} onClick={this.handleCancelChanges}>Cancel Changes</CancelButton>
                            <DeleteButton onClick={this.handleDeleteBook}>Delete</DeleteButton>
                        </FlexContainer>
                    </BookDetailsCard>
                </BookDetailsBgContainer>
            </Source>
        );
    }
}

export default BookDetails;
