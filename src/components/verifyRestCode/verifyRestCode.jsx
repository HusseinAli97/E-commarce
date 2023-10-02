import styles from './verifyRestCode.module.css'
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { Formik, useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import ChangePassword from '../changePassword/changePassword';
export default function VerifyRestCode({ resendCode,backToLogin }) {
    const [changePasswordForm, setChangePasswordForm] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [timer, setTimer] = useState(60);
    const restCodeSchema = Yup.object({
        resetCode: Yup.string().required("Code is Required to Reset Password"),
    })
    const formik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validationSchema: restCodeSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
                if (response.status === 200) {
                    toast.success('Code Verified', { position: "top-center", autoClose: 1500 });
                    setChangePasswordForm(true);
                }

            } catch (error) {
                toast.error(error.response.data.message, { position: "top-center", autoClose: 3000 });
            }
        }
    })
    const handleDisableTime = () => {
        if (!disableButton) {
            setDisableButton(true);
            resendCode();
            let remainingTime = 60;
            const intervalId = setInterval(() => {
                remainingTime--;
                setTimer(remainingTime);

                if (remainingTime === 0) {
                    clearInterval(intervalId);
                    setDisableButton(false);
                    setTimer(60); // Reset the timer
                }
            }, 1000);
        }
    };

    useEffect(() => {
        if (disableButton) {
            const timeoutId = setTimeout(() => {
                setDisableButton(false);
            }, 60000);
            return () => clearTimeout(timeoutId);
        }
    }, [disableButton]);
    return (
        <>
            {
                changePasswordForm ?
                    <ChangePassword  backToLogin={backToLogin}/>
                    :
                    <motion.div
                        key="login-form"
                        initial={{ opacity: 0, rotateY: -180 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 180 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={` d-block position-absolute top-0 start-0 ${styles.MnH} `}>
                            {formik.errors.resetCode && formik.touched.resetCode && (
                                <div className="textErorr fw-bold bg-dark px-2 py-1 rounded ms-auto d-block bg-opacity-25 mb-2">
                                    * {formik.errors.resetCode}
                                </div>
                            )}
                        </div>
                        <h3 className="mb-3 fw-bold text-center">Verify Code</h3>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <FloatingLabel controlId="floatingInput" label="Reset Code">
                                    <Form.Control className={`mb-4`} type="text"
                                        placeholder="Reset Code"
                                        name='resetCode'
                                        autoComplete='em'
                                        value={formik.values.resetCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                </FloatingLabel>
                            </Form.Group>
                            <div className="d-grid gap-2 w-100">
                                <Button variant="danger" type="submit" className="w-100">
                                    Submit
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-100"
                                    onClick={handleDisableTime}
                                    disabled={disableButton}
                                >
                                    {disableButton ? `Resend Code ${timer}` : 'Resend Code'}
                                </Button>
                            </div>
                        </Form>
                    </motion.div>
            }
        </>
    )
}
