import styled from 'styled-components'

export const HomeBgContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://www.clutter.com/blog/wp-content/uploads/2018/03/02072057/book-spine-golden-page-edges-1.jpg');
        background-size: cover;
        background-position: center;
        opacity: 0.6;
        z-index: -1; 
    }
`;

export const TagLine1 = styled.h1`
    font-size: 80px;
    color: #394503;
    margin: 0px;
`
export const TagLine2 = styled.h1`
    font-size: 50px;
    color: #000;
    margin: 20px;
    text-align: center;
`
export const SearchBgContainer = styled.div`
    width: 40%;
    padding: 20px;
    border-radius: 20px;
    align-self: center;
    background: linear-gradient(135deg, #b0d4e3, #d6eaf7, #f2fbff);
    display: flex;
    flex-direction: column;
`
export const Input = styled.input`
    width: 60%;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`
export const SearchButton = styled.button`
    align-self: center;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 20px;
`