import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/Color logo - no background.svg';
import style from './NavBar.module.css';
import { TokenContext } from '../../context/TokenContext';

export default function NavBar() {
    const { token } = useContext(TokenContext);
    const [isHidden, setIsHidden] = useState(token === null);

    useEffect(() => {
        setIsHidden(token === null);
    }, [token]);

    const variants = {
        hidden: { opacity: 0, x: '100%' },
        visible: { opacity: 1, x: 0 },
    };
    let content = (<div className="d-flex align-items-center justify-content-between w-100">
        <motion.div
            initial={isHidden ? "hidden" : "visible"}
            animate={isHidden ? "hidden" : "visible"}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="me-auto"
        >
            <Nav>
                <Link to="/" className="textHover fw-bold mx-3 nav-link">
                    Home
                </Link>
                <Link to="/products" className="textHover fw-bold mx-3 nav-link">
                    Products
                </Link>
                <Link to="/brands" className="textHover fw-bold mx-3 nav-link">
                    Brands
                </Link>
                <Link to="/categories" className="textHover fw-bold mx-3 nav-link">
                Categories
                </Link>
            </Nav>
        </motion.div>
        <motion.div
            initial={isHidden ? "hidden" : "visible"}
            animate={isHidden ? "hidden" : "visible"}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="ms-auto"
        >
            <Nav className="d-flex align-items-center justify-content-center">
                <Link to="/wishlist" className="nav-link">
                    <i className={`fa-regular fa-heart wishListHover fa-lg me-2  ${style.wishListHover}`}></i>
                    <span className='pink-Color  text-white quantity'>0</span>
                </Link>
                <Link to="/cart" className="nav-link">
                    <i className={`fas fa-shopping-cart cartHover fa-lg me-2 ${style.cartHover}`}></i> 
                    <span className='mustard-Color  text-white quantity'>0</span>
                </Link>
            </Nav>
        </motion.div>
    </div>);
    return (
        <Navbar expand="md" className="">
            <Container fluid className="">
                <Link to="/" className="d-flex align-items-center justify-content-center">
                    <img src={logo} alt="logo" className="img-fluid" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="shadow-none border-0" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {token ? content : content}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
