import React, { useContext, useState } from 'react';
import logo from "../../images/logo.png";
import { Col, Row, Container, Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import styles from './Register.module.css';
import { showForm } from '../../context/ShowRegister';

export default function Register({ handleClose, show }) {
    const { isLoginForm, setIsLoginForm } = useContext(showForm);
    const navigate = useNavigate();

    const switchToLoginForm = () => {
        setIsLoginForm(true);
    };
    const handleSuccessfulLogin = () => {
        handleClose();
        window.location.reload();
        navigate("/");
    };
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
            <Modal show={show} centered onHide={handleClose} className={`${styles.bg}`} size='lg'>
                <Container className={`p-0 shadow  ${styles.bgCard}  position-relative`}>
                    <Row className='py-5'>
                        <Col xs={10} className={`mx-auto ${styles.bgForm}`}>
                            <div className="text-center py-1 mb-2 position-absolute bottom-0 start-50 translate-middle ">
                                {isLoginForm ? (
                                    <motion.div
                                        key="buttonSignup"
                                        initial={{ opacity: 0, rotateY: -180 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, rotateY: 180 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="d-flex flex-row align-items-center justify-content-center pb-1 mb-1 mt-2   ">
                                            <p className="mb-0">Don't have an account?</p>
                                            <Button
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
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="buttons"
                                        initial={{ opacity: 0, rotateY: -180 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, rotateY: 180 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="d-flex flex-row align-items-center justify-content-center pb-1 mb-1 mt-2   ">
                                            <p className="mb-0"> Have an account?</p>
                                            <Button
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
                                    </motion.div>
                                )}
                            </div>
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    );
}
