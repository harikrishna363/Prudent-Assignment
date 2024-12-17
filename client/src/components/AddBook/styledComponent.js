import styled from "styled-components";

export const AddBookBgContainer = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #b0d4e3, #d6eaf7, #f2fbff);
    display:flex;
    justify-content: center;
    align-items: center;
`
export const Form = styled.form`
    width: 40%;
    border-radius: 30px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    background: linear-gradient(135deg, #4a8cb0, #6faed6, #d6f0ff);
`
export const Input = styled.input`
    width: 60%;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`
export const AddBookButton = styled.button`
    border-radius: 8px;
    cursor: pointer;
    padding: 12px 30px;
    background-color: #3498DB;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 600;
    align-self: center;
    margin: 20px;
`