import {Link} from 'react-router-dom'

import { Logo, MenuItem, MenuItemsContainer, Navbar } from "./styledComponent"

const Header = () => {

    return(
        <Navbar>            
            <MenuItemsContainer>
                <Link to='/'>
                    <Logo src='https://media.istockphoto.com/id/877235850/vector/book-icon.jpg?s=612x612&w=0&k=20&c=FSTH3SrcKKTSH09LLkucwABRWOKHRYPmEjxqBjEDjxc=' alt="logo" />
                </Link>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <MenuItem>Home</MenuItem>
                </Link>
                <Link to='/contact' style={{ textDecoration: 'none' }}>
                    <MenuItem>Contact</MenuItem>
                </Link>
                <Link to='/about' style={{ textDecoration: 'none' }}>
                    <MenuItem>About</MenuItem>
                </Link>
                </div>

                <Link to='/add-book' style={{ textDecoration: 'none'}}>
                    <MenuItem>Add Book</MenuItem>
                </Link>
            </MenuItemsContainer>

            
        </Navbar>
    )
}

export default Header