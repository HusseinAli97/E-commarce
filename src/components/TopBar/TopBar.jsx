import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate,redirect } from 'react-router-dom';
import styles from './TopBar.module.css';
import { useContext, useState } from 'react';
import Register from '../Register/Register';
import { motion } from 'framer-motion';
import { TokenContext } from '../../context/TokenContext';
import { showForm } from '../../context/ShowRegister';

export default function TopBar() {
    const {show, setShow} = useContext(showForm);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { token, setToken } = useContext(TokenContext);
    let navigate = useNavigate();
    const clrStorage = () => {
        localStorage.removeItem('userToken');
        setToken(null);
        window.location.reload();
    }
    return (
        <>
            <Navbar expand="sm" className={`navColor ${styles.topNav} `}>
                <Container className='border-bottom'>
                    <Navbar.Text className='d-flex align-items-center '>
                        <Form.Select size='sm' className={`${styles.formSelect}`} >
                            <option value="1">USD</option>
                            <option value="2">EGP</option>
                        </Form.Select>
                    </Navbar.Text>
                    <Navbar.Text className='d-flex align-items-center '>
                        <Form.Select size='sm' className={`${styles.formSelect}`} >
                            <option value="LanguageEn">En</option>
                            <option value="LanguageAr">Ar</option>
                            <option value="LanguageFr">Fr</option>
                        </Form.Select>
                    </Navbar.Text>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 shadow-none'> <i className="fas fa-angle-down textHover"></i> </Navbar.Toggle>
                    <Navbar.Collapse className="justify-content-end ">
                        <Nav className="ms-lg-auto d-flex align-items-center ">
                            <Link to="/About" className={`me-2 fw-light textHover nav-link`}>About Us</Link>
                            <Link to="/Contact" className={`me-2 fw-light textHover nav-link`}> Contact Us</Link>
                            {token ?
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, rotateY: -180 }}
                                    animate={{ opacity: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, rotateY: 180 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div role='button' className={`me-2 fw-light textHover nav-link`} onClick={clrStorage}>
                                        <i className="fas fa-sm fa-sign-out iconHover me-1 fa-rotate-180"></i>
                                        LogOut
                                    </div>
                                </motion.div >
                                :
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, rotateY: -180 }}
                                    animate={{ opacity: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, rotateY: 180 }}
                                    transition={{ duration: 0.5 }}>
                                    <div role='button' className={`me-2 fw-light textHover nav-link`} onClick={handleShow}>
                                        <i className="fas fa-sm fa-user me-1"></i>
                                        Register/Login
                                    </div>
                                </motion.div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Register show={show} handleClose={handleClose} />
            </Navbar>
        </>
    )
}
