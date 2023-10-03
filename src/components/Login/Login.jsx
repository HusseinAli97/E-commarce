import { useFormik } from 'formik';
import { useState, useContext } from 'react';
import { Form, Col, FloatingLabel, Button, Row, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as Yup from 'yup';
import styles from './Login.module.css';
import { TokenContext } from '../../context/TokenContext'
import ForgetPassword from '../ForgetPassword/ForgetPassword';

export default function Login({ onSuccessfulLogin }) {
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useContext(TokenContext);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const handleSwitchForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
        formik.resetForm();
    };


    // Validation schema for login
    const loginValidationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Address").required("Email is Required"),
        password: Yup.string().min(6, "Minimum 6 Characters Required").required("Password is Required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                // make API request to login
                const response = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', values);
                //  successful login 
                localStorage.setItem('userToken', response.data.token);
                setToken(response.data.token);
                onSuccessfulLogin();
                setIsLoading(false);
                toast.success("Login successful!", { position: "top-center", autoClose: 1500 });
            } catch (error) {
                //  login error
                setIsLoading(false);
                toast.error(error.response.data.message, { position: "top-center", autoClose: 1500 });
            }
        },
    });
    return (
        <>
        <ToastContainer />
            <motion.div
                key="login-form"
                initial={{ opacity: 0, rotateY: -180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 180 }}
                transition={{ duration: 0.5 }}
            >
                <div className={` d-block position-absolute top-0 start-0 p-2 ${styles.MnH} `}>
                    {formik.errors.email && formik.touched.email && (
                        <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                            * {formik.errors.email}
                        </div>
                    )}
                    {formik.errors.password && formik.touched.password && (
                        <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25">
                            * {formik.errors.password}
                        </div>
                    )}
                </div>
                {
                    showForgotPassword ? <ForgetPassword backToLogin={handleSwitchForgotPassword} /> :
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, rotateY: -180 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Form onSubmit={formik.handleSubmit} autoComplete="off" >
                                <Row className='pb-2 '>
                                    <Col md={12}>
                                        <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-2">
                                            <Form.Control type="email"
                                                placeholder="Email address"
                                                name='email'
                                                autoComplete='off'
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={12}>
                                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name='password'
                                                autoComplete='off'
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                {isLoading ? <Button type="submit" className=' mb-2 px-5 mx-auto d-block' variant='primary'>
                                    <i className="fas fa-spinner fa-spin"></i>
                                </Button>
                                    : <Button type="submit" disabled={!(formik.isValid && formik.dirty)} className='mb-2 px-5 mx-auto d-block' variant='primary'>Log in</Button>}
                            </Form>
                        </motion.div>
                }
                <div className={` d-flex align-items-center justify-content-center mt-3  ${styles.MnH} forgetPassword `}>
                    {!showForgotPassword ?
                        <Button variant="link" onClick={handleSwitchForgotPassword} className=' link-light link-underline-opacity-25 link-underline-opacity-100-hover'>
                            Forgot Password?
                        </Button>
                        :
                        <Button variant="outline-primary" onClick={
                            handleSwitchForgotPassword
                        } className=' btn text-white position-absolute top-0 end-0'>
                            Login <i className="fa-solid fa-arrow-right"></i>
                        </Button>
                    }
                </div>
            </motion.div>
        </>
    );
}

