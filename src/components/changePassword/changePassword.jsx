import styles from './changePassword.module.css'
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap';
import { Formik, useFormik } from 'formik';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import { CartContext } from '../../context/Cart';
import { showForm } from '../../context/ShowRegister';

export default function ChangePassword({backToLogin}) {
    
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Address").required("Email is Required"),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,15}$/, "Password Must Start With Capital").min(6, "Minimum 6 Characters Required").required("Password is Required"),
        rePassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Password Does Not Match").required("Re-Password is Required"),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            let {rePassword,...dataSend} = values
            try {
                const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', dataSend);
                if (response.status === 200) {
                    toast.success('Password Changed', { position: "top-center", autoClose: 1500 });
                    formik.resetForm();
                    backToLogin();
                }
            } catch (error) {
                toast.error(error.response.data.message, { position: "top-center", autoClose: 3000 });
            }
        }
    })

    return (
        <motion.div
            key="login-form"
            initial={{ opacity: 0, rotateY: -180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 180 }}
            transition={{ duration: 0.5 }}
        >
            {/* Errors Messages */}
            <div className={` d-block position-absolute top-0 start-0 ${styles.MnH}`}>
                {formik.errors.email && formik.touched.email && (
                    <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                        * {formik.errors.email}
                    </div>
                )}
                {formik.errors.newPassword && formik.touched.newPassword && (
                    <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                        * {formik.errors.newPassword}
                    </div>
                )}
                {formik.errors.rePassword && formik.touched.rePassword && (
                    <div className="textErorr fw-bold bg-dark  px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                        * {formik.errors.rePassword}
                    </div>
                )}
            </div>
            <h3 className="mb-3 fw-bold text-center">Create New Password</h3>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="Email">
                        <Form.Control 
                            className={`mb-4`}
                            type="email"
                            placeholder="Email"
                            name='email'
                            autoComplete='em'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                    </FloatingLabel>
                </Form.Group>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel controlId="floatingPassword" label="newPassword">
                                <Form.Control 
                                className={`mb-4`} 
                                type="password"
                                placeholder="newPassword"
                                name='newPassword'
                                autoComplete='em'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel controlId="floatingPassword" label="Re-Password">
                                <Form.Control className={`mb-4`} type="password"
                                    placeholder="Re-Password"
                                    name='rePassword'
                                    autoComplete='em'
                                    value={formik.values.rePassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="success" type="submit" className="w-100">
                    Change Password
                </Button>
            </Form>
        </motion.div>
    )
}
