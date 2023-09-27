import styles from './ForgetPassword.module.css'
import { Formik, useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function ForgetPassword({ onResetPassword }) {

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };
    const forgetPasswordSchema = Yup.object({
        email: Yup.string().email("Invalid Email Address").required("Email is Required"),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgetPasswordSchema,
        onSubmit: async (email) => {
            try {
                const response = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/forgot-password', email);
                toast.success(response.data.message, { position: "top-right", autoClose: 1500 });
            } catch (error) {
                toast.error(error.response.data.message, { position: "top-right", autoClose: 3000 });
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
            <div className={` d-block position-absolute top-0 start-0 ${styles.MnH} `}>
                {formik.errors.email && formik.touched.email && (
                    <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                        * {formik.errors.email}
                    </div>
                )}
            </div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                        placeholder="Email address"
                        name='email'
                        autoComplete='em'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </motion.div>

    )
}
