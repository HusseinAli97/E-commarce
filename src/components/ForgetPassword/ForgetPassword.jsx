import styles from './ForgetPassword.module.css'
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import VerifyRestCode from '../verifyRestCode/verifyRestCode';

export default function ForgetPassword({ backToLogin }) {

    const [showCodeVerification, setShowCodeVerification] = useState(false);
    const forgetPasswordSchema = Yup.object({
        email: Yup.string().email("Invalid Email Address").required("Email is Required"),
        // code: Yup.string().matches(/^[0-9]{6}$/, "Invalid Code").min(6, "Code must be 6 digits").required("Code is Required to Reset Password"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgetPasswordSchema,
        onSubmit: async (email) => {
            try {
                const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', email);
                toast.success(response.data.message, { position: "top-center", autoClose: 1500 });
                setShowCodeVerification(true);
            } catch (error) {
                toast.error(error.response.data.message, { position: "top-center", autoClose: 3000 });
            }
        }
    })
    const resendCode = () => {
        formik.handleSubmit();
    }
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
            {showCodeVerification ?
                <VerifyRestCode
                    resendCode={resendCode}
                    backToLogin={backToLogin}
                />
                :
                <motion.div
                    key="login-form"
                    initial={{ opacity: 0, rotateY: -180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                >
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel controlId="floatingInput" label="Email address">
                                <Form.Control className={`mb-4`} type="email"
                                    placeholder="Email address"
                                    name='email'
                                    autoComplete='em'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                            </FloatingLabel>
                            <Form.Text className="text-warning fs-6 ">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="warning" type="submit" className="w-100">
                            Send Code
                        </Button>
                    </Form>
                </motion.div>
            }
        </motion.div>

    )
}
