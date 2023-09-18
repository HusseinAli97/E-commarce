import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css'
import logo from "../../images/Color logo - no background.svg"
import styles from './NavBar.module.css'
export default function NavBar() {
    return (
        <Navbar expand="md" className="">
            <Container>
                <Navbar.Brand href="#home">
                    <Link to="/">
                    <img src={logo} alt="logo" className='img-fluid' />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='shadow-none border-0' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto justify-content-between">
                        <Link to="/" className='textHover fw-bold mx-3 nav-link'>
                            Home
                        </Link>
                        <Link to="/products" className='textHover fw-bold mx-3 nav-link'>
                            Products
                        </Link>
                        <Link to="/brands" className='textHover fw-bold mx-3 nav-link'>
                            Brands
                        </Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {/* <Link to="search" className='nav-link'>
                            <i className={`fas fa-search fa-lg mx-2 textHover`}></i>
                        </Link> */}
                        <Link to="/wishlist" className='nav-link'>
                            <i className={`fa-regular fa-heart wishListHover fa-lg mx-2 ${style.wishListHover}`}></i>
                            </Link>
                        <Link to="/cart" className='nav-link'>
                            <i className={`fas fa-shopping-cart cartHover fa-lg mx-2  ${style.cartHover}`}></i>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
