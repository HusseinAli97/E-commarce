import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/Color logo - no background.svg';
import style from './NavBar.module.css';
import { TokenContext } from '../../context/TokenContext';
import DropDownCart from '../DropDownCart/DropDownCart';
import { wishListContext } from '../../context/WishList';

export default function NavBar() {
    const { token } = useContext(TokenContext);
    const [isHidden, setIsHidden] = useState(null);
    const { wishListCount, getUserWishList, isLoading } = useContext(wishListContext)
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
                <Link to="/brands" className="textHover fw-bold mx-3 nav-link">
                    Brands
                </Link>
                <Link to="/categories" className="textHover fw-bold mx-3 nav-link">
                    Categories
                </Link>
            </Nav>
        </motion.div>
        <motion.div
            variants={variants}
            transition={{ duration: 0.5 }}
            className="ms-auto"
        >
            <Nav className="d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center text-center" >
                    <Link to="/wishlist" className="nav-link">
                        <i className={`fa-regular fa-heart wishListHover fa-lg me-2  ${style.wishListHover}`}></i>
                        {wishListCount ?
                            <span className='pink-Color text-white quantity'>
                                {wishListCount}
                            </span>
                            :
                            isLoading ? <i className='fa fa-spinner fa-spin'></i> : <span className='pink-Color text-white quantity'>
                                0
                            </span>
                        }
                    </Link>
                </div>
                <DropDownCart />
            </Nav>
        </motion.div>
    </div >);
    return (
        <>
            {
                token && <Navbar expand="md" className="shadow-lg py-3">
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
            }
        </>
    );
}
