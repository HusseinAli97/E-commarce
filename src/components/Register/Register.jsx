import { useState } from 'react';
import logo from "../../images/logo.png";
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Button, Row, Container, Form, Modal, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import styles from './Register.module.css';
import * as Yup from 'yup';
export default function Register({ handleClose, show }) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    let valditionSchema = Yup.object({
        name: Yup.string().max(15, "Maximum 15 Characters Required").min(3, "Minimum 3 Characters Required").required("Name is Required"),
        email: Yup.string().email("Invalid Email Address").required("Email is Required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,15}$/, "Password Must Start With Capital").min(6, "Minimum 6 Characters Required").required("Password is Required"),
        rePassword: Yup.string().oneOf([Yup.ref("password"), null], "Password Does Not Match").required("Re-Password is Required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number").required("Phone is Required")
    })
    async function register(values) {
        setIsLoading(true);
        let { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values).catch((err) => {
            toast.error(err.response.data.message);
            setIsLoading(false);
        });
        if (data.message === "success") {
            toast.success("Account Created Successfully");
            setIsLoading(false);
            navigate('/');
            handleClose();
            formik.resetForm();
        }
    }
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }, validationSchema: valditionSchema,
        onSubmit: values => register(values)
    })
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
            <Modal show={show} centered onHide={handleClose} size='lg' className={`${styles.bg}`} >
                <Container className={`p-0  shadow ${styles.bgCard} position-relative`}>
                    <Row className='py-5'>
                        <Col xs={10} className={`mx-auto ${styles.bgForm}`}>
                            <div className="d-flex flex-column w-100 justify-content-center align-items-center position-relative">
                                <div className={`${styles.MnH} d-block  position-absolute top-0 start-0  `}>
                                    {formik.errors.name && formik.touched.name ? <Form.Text className="textErorr fw-bold bg-dark px-2 py-1  rounded ms-auto d-flex bg-opacity-25">* {formik.errors.name}</Form.Text> : null}
                                    {formik.errors.email && formik.touched.email ? <Form.Text className="textErorr fw-bold bg-dark px-2 py-1  rounded ms-auto d-block bg-opacity-25">* {formik.errors.email}</Form.Text> : null}
                                    {formik.errors.password && formik.touched.password ? <Form.Text className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25">* {formik.errors.password}</Form.Text> : null}
                                    {formik.errors.rePassword && formik.touched.rePassword ? <Form.Text className="textErorr fw-bold bg-dark  px-2 py-1 rounded ms-auto d-block bg-opacity-25">* {formik.errors.rePassword}</Form.Text> : null}
                                    {formik.errors.phone && formik.touched.phone ? <Form.Text className="textErorr fw-bold bg-dark rounded px-2 py-1 ms-auto d-block bg-opacity-25">*{formik.errors.phone}</Form.Text> : null}
                                </div>
                                <div className="text-center">
                                    <img src={logo} width={"150px"} alt="logo" />
                                    <h4 className="mt-1 mb-2 pb-1">We are GLAM Team</h4>
                                </div>
                                <p>Please sign up to continue</p>
                                <form className={`w-100     `} onSubmit={formik.handleSubmit}>
                                    <Row className='pb-2' >
                                        <Col md={6}>
                                            <FloatingLabel controlId="floatingName" label="Name" className="mb-2">
                                                <Form.Control type="text" placeholder="Name" className='mb-2' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-2">
                                                <Form.Control type="email" placeholder="Email address" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                                                <Form.Control type="password" placeholder="Password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel controlId="floatingrePassword" label="Confirm Password" className="mb-2">
                                                <Form.Control type="password" placeholder="Confirm Password" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-2">
                                        <Form.Control type="tel" placeholder="Phone Number" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    </FloatingLabel>
                                    <div className="text-center py-1 mb-2 ">
                                        {isLoading ? <Button className="mb-2 w-100  " type="submit" variant="success">
                                            <i className="fas  fa-spinner fa-spin fa-2x "></i>
                                        </Button> : <Button className="mb-2 w-100  " type="submit" variant="success">Sign up</Button>}

                                        <Link className="textHover nav-link text-decoration-underline">Forgot password?</Link>
                                    </div>
                                    <div className="d-flex flex-row align-items-center justify-content-center pb-1 mb-1">
                                        <p className="mb-0">Do You have an account?</p>
                                        <Button outline className='mx-2' variant='outline-warning'>
                                            Sign in
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    );
}
