import React, { useState } from 'react';
import logo from "../../images/logo.png";
import { Col, Row, Container, Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import styles from './Register.module.css';
export default function Register({ handleClose, show }) {
    const [isLoginForm, setIsLoginForm] = useState(false);
    const navigate = useNavigate();
    const switchToLoginForm = () => {
        setIsLoginForm(true);
    };
    const handleSuccessfulLogin = () => {
        handleClose(); 
        navigate('/'); 
    };
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
            <Modal show={show} centered onHide={handleClose} className={`${styles.bg}`} size='lg'>
                <Container className={`p-0 shadow  ${styles.bgCard}  position-relative`}>
                    <Row className='py-5'>
                        <Col xs={10} className={`mx-auto ${styles.bgForm}`}>
                            <div className="d-flex flex-column w-100 justify-content-center align-items-center position-relative">
                                <div className="text-center">
                                    <img src={logo} width={"150px"} alt="logo" />
                                    <h4 className="mt-1 mb-2 pb-1">We are GLAM Team</h4>
                                </div>
                                <p>Please {isLoginForm ? 'log in' : 'sign up'} to continue</p>
                                {isLoginForm ? (
                                    <Login onSuccessfulLogin={handleSuccessfulLogin} />
                                ) : (
                                    <SignUp switchToLoginForm={switchToLoginForm} />
                                )}
                                <div className="text-center py-1 mb-2">
                                    {isLoginForm ? (
                                        <div className="d-flex flex-row align-items-center justify-content-center pb-1 mb-1">
                                            <p className="mb-0">Don't have an account?</p>
                                            <Button
                                                outline
                                                className='mx-2'
                                                variant='outline-warning'
                                                onClick={() => {
                                                    // to signup
                                                    setIsLoginForm(false);
                                                }}
                                            >
                                                Sign up
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-row align-items-center justify-content-center pb-1 mb-1">
                                            <p className="mb-0">Already have an account?</p>
                                            <Button
                                                outline
                                                className='mx-2'
                                                variant='outline-warning'
                                                onClick={() => {
                                                    // to login
                                                    setIsLoginForm(true);
                                                }}
                                            >
                                                Log in
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    );
}
