import styled from "styled-components";

export const BookDetailsBgContainer = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #b0d4e3, #d6eaf7, #f2fbff);
    display:flex;
    justify-content: center;
    align-items: center;
`
export const BookDetailsCard = styled.div`
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
export const FlexContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
export const SaveButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#4CAF50')};
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (!props.disabled ? '#45a049' : '#ccc')};
  }
`;
export const CancelButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#f5963d')};
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (!props.disabled ? '#e58532' : '#ccc')};
  }
`;
export const DeleteButton = styled.button`
  margin: 10px;
  margin-right: 30px;
  padding: 10px 20px;
  background-color: #d9534f;
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;