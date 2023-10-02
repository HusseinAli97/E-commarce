import styles from './UserAddress.module.css'
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { addressContext } from '../../context/Address';


export default function UserAddress() {
    const [addresses, setAddresses] = useState([]);
    const { setAddressRequierd, currantAddress, setCurrantAddress,setData } = useContext(addressContext);
    const [addNew, setAddNew] = useState(false);
    const headers = {
        token: localStorage.getItem('userToken')
    };
    const validationSchema = Yup.object({
        name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
        details: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Details are required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid').required('Phone number is required'),
        city: Yup.string().matches(/^[a-zA-Z ]+$/, 'City is not valid').required('City is required'),
    });
    useEffect(() => {
        if (addresses.length > 0) {
            setAddressRequierd(false);
        } else {
            setAddressRequierd(true);
        }
    }, [addresses]);

    const formik = useFormik({
        initialValues: {
            name: '',
            details: '',
            phone: '',
            city: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                let response = await axios.post('https://route-ecommerce.onrender.com/api/v1/addresses', values, { headers });
                toast.success('Address added successfully!', { position: 'top-center', autoClose: 1500 });
                formik.resetForm();
                setAddresses(response.data.data);
            } catch (error) {
                toast.error(error.message, { position: 'top-center', autoClose: 1500 });
            }
        },
    })
    const addForm = () => {
        return (
            <Container className='p-5'>
                <h2 className={`${styles.heading} text-start ms-3`}>Address Form</h2>
                <Form className={`${styles.form}`} onSubmit={formik.handleSubmit}>
                    <FloatingLabel controlId="name" label="Name" className={`${styles.Labels}`} >
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${styles.input} mb-3`}
                        />
                    </FloatingLabel>
                    {formik.errors.name && formik.touched.name && <div className="alert alert-danger px-2 py-1 text-muted"> {formik.errors.name}</div>}
                    <FloatingLabel controlId="details" label="Details" className={`${styles.Labels}`} >
                        <Form.Control
                            type="text"
                            name="details"
                            placeholder="Details"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${styles.input} mb-3`}
                        />
                    </FloatingLabel>
                    {formik.errors.details && formik.touched.details && <div className="alert alert-danger px-2 py-1 text-muted"> {formik.errors.details}</div>}
                    <FloatingLabel controlId="phone" label="Phone" className={`${styles.Labels}`} >
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${styles.input} mb-3`}
                        />
                    </FloatingLabel>
                    {formik.errors.phone && formik.touched.phone && <div className="alert alert-danger px-2 py-1 text-muted"> {formik.errors.phone}</div>}
                    <FloatingLabel controlId="city" label="City" className={`${styles.Labels}`} >
                        <Form.Control
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${styles.input} mb-3`}
                        />
                    </FloatingLabel>
                    {formik.errors.city && formik.touched.city && <div className="alert alert-danger px-2 py-1 text-muted"> {formik.errors.city}</div>}
                    <Button
                        variant="primary"
                        type="submit"
                        className={`${styles.button} ${styles.blueColor}`}
                    >
                        Add Address
                    </Button>
                </Form>
            </Container>
        )
    }
    async function getAddresses() {
        try {
            const response = await axios.get('https://route-ecommerce.onrender.com/api/v1/addresses', { headers });
            setAddresses(response?.data?.data);
            setCurrantAddress(response?.data?.data[response.data.data.length - 1]?._id);
        } catch (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 1500 });
        }
    }
    useEffect(() => {
        getAddresses();
    }, [])
    async function deleteAddress(id) {
        try {
            let response = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/addresses/${id}`, { headers });
            toast.success('Address deleted successfully!', { position: 'top-center', autoClose: 1500 });
            setAddresses(response.data.data);
            setAddressRequierd(true);
        } catch (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 1500 });
        }
    }
    async function getCurrentAddress() {
        let res = await axios.get(`https://route-ecommerce.onrender.com/api/v1/addresses/${currantAddress}`,{
            headers:{
                token: localStorage.getItem('userToken')
            }
        })
        setData(res?.data?.data);
    }
    useEffect(() => {
        getCurrentAddress()
    }, [currantAddress]);
    return (
        <>
            {
                addresses.length > 0 ?
                    <>
                        <Button className={`${styles.addBtn} mb-3 `} onClick={() => setAddNew(!addNew)}>
                            <i className={`${styles.add} fa-solid fa-plus`}></i>
                        </Button>
                        {addresses?.map((address) => (
                            <div className={`${styles.addressContainer} d-flex justify-content-between align-items-center}`} key={address._id}>
                                <Form.Check
                                    type='radio'
                                    label={`${address?.name} - ${address?.city} - ${address?.phone} - ${address?.details}`}
                                    name='address'
                                    value={address._id}
                                    checked={currantAddress === address._id}
                                    id={address._id}
                                    key={address._id}
                                    onChange={(e) => setCurrantAddress(e.target.value)}
                                    className={`${styles.Radio} mb-2`
                                    }
                                />
                                <div className={`${styles.deleteBtn}`}>
                                    <i className={`${styles.trash} fa-solid fa-xmark`} onClick={() => deleteAddress(address._id)} />
                                </div>
                            </div>
                        ))}
                        {
                            addNew && addForm()
                        }
                    </>
                    :
                    addForm()
            }
        </>
    );
};
