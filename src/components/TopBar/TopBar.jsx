import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.css';
import { useState } from 'react';
import Register from '../Register/Register';

export default function TopBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Navbar expand="sm" className="navColor ">
            <Container className='border-bottom'>
                <Navbar.Text  className='d-flex align-items-center '>
                    <Form.Select size='sm' className={`${styles.formSelect}`} >
                        <option value="1">USD</option>
                        <option value="2">EGP</option>
                    </Form.Select>
                </Navbar.Text>
                <Navbar.Text  className='d-flex align-items-center '>
                <Form.Select size='sm' className={`${styles.formSelect}`} >
                        <option value="LanguageEn">En</option>
                        <option value="LanguageAr">Ar</option>
                        <option value="LanguageFr">Fr</option>
                    </Form.Select>
                </Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 shadow-none'> <i className="fas fa-angle-down textHover"></i> </Navbar.Toggle>
                <Navbar.Collapse className="justify-content-end ">
                    <Nav className="ms-lg-auto ">
                        <Link to="/About" className={`me-2 fw-light textHover nav-link`}>About Us</Link>
                        <Link to="/Contact" className={`me-2 fw-light textHover nav-link`}>Contact Us</Link>
                        <div role='button' className={`me-2 fw-light textHover nav-link`} onClick={handleShow}>
                            <i className="fas fa-sm fa-user me-1"></i>
                            Register
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Register show={show} handleClose={handleClose} />
        </Navbar>
        </>
    )
}
