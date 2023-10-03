import { useFormik } from 'formik';
import { useState } from 'react';
import { Form, Col, FloatingLabel, Button, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as Yup from 'yup';
import styles from './SignUp.module.css';

export default function SignUp({ switchToLoginForm }) {
    const [isLoading, setIsLoading] = useState(false);

    // Validation schema for registration
    const validationSchema = Yup.object({
        name: Yup.string().max(15, "Maximum 15 Characters Required").min(3, "Minimum 3 Characters Required").required("Name is Required"),
        email: Yup.string().email("Invalid Email Address").required("Email is Required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,15}$/, "Password Must Start With Capital").min(6, "Minimum 6 Characters Required").required("Password is Required"),
        rePassword: Yup.string().oneOf([Yup.ref("password"), null], "Password Does Not Match").required("Re-Password is Required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number").required("Phone is Required")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // make API request to sign up
                setIsLoading(true);
                const response = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values);
                // successful registration 
                setIsLoading(false);
                toast.success("Registration successful", { position: "top-center", autoClose: 1500 ,theme: 'colored'});
                formik.resetForm();
                switchToLoginForm();
            } catch (error) {
                // registration error
                setIsLoading(false);
                toast.error(error.response.data.message, { position: "top-center", autoClose: 1500, theme: 'colored'});
            }
        },
    });

    return (
        <>
            <ToastContainer />
            <motion.div
                key="register-form"
                initial={{ opacity: 0, rotateY: -180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 180 }}
                transition={{ duration: 0.5 }}
            >
                {/* Errors Messages */}
                <div className={` d-block position-absolute top-0 start-0 p-2 ${styles.MnH}`}>
                    {formik.errors.name && formik.touched.name && (
                        <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-flex bg-opacity-25 mb-2">
                            * {formik.errors.name}
                        </div>
                    )}
                    {formik.errors.email && formik.touched.email && (
                        <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                            * {formik.errors.email}
                        </div>
                    )}
                    {formik.errors.password && formik.touched.password && (
                        <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                            * {formik.errors.password}
                        </div>
                    )}
                    {formik.errors.rePassword && formik.touched.rePassword && (
                        <div className="textErorr fw-bold bg-dark  px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                            * {formik.errors.rePassword}
                        </div>
                    )}
                    {formik.errors.phone && formik.touched.phone && (
                        <div className="textErorr fw-bold bg-dark rounded px-2 py-1 ms-auto d-block bg-opacity-25 mb-2">
                            * {formik.errors.phone}
                        </div>
                    )}
                </div>

                <Form onSubmit={formik.handleSubmit}>
                    <Row className='pb-2'>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingName" label="Name" className="mb-2">
                                <Form.Control type="text" placeholder="Name" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </FloatingLabel>

                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-2">
                                <Form.Control type="email" placeholder="Email address" autoComplete='off' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                                <Form.Control type="password" placeholder="Password" autoComplete='off' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingrePassword" label="Confirm Password" className="mb-2">
                                <Form.Control type="password" placeholder="Confirm Password" autoComplete='off' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-2">
                        <Form.Control type="tel" placeholder="Phone Number" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </FloatingLabel>
                    {isLoading ?
                        <Button type="submit" className='my-3 px-5 mx-auto d-block' variant='success'>
                            <i className="spinner-border spinner-border-sm"></i>
                        </Button> :
                        <Button type="submit" disabled={!(formik.isValid && formik.dirty)} className='my-3 px-5 mx-auto d-block' variant='success'>
                            Sign up
                        </Button>}
                </Form>
            </motion.div>
        </>
    );
}