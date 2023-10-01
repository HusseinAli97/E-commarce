import { Button, Col, Container, FormCheck, Row, Table } from 'react-bootstrap'
import styles from './CheckOut.module.css'
import BgHeader from '../bgHeader/bgHeader'
import UserAddress from '../UserAddress/UserAddress'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { CartContext } from '../../context/Cart'
import { useContext, useEffect, useState } from 'react'
import { priceContext } from '../../context/Price'
import { Link } from 'react-router-dom'
import { addressContext } from '../../context/Address'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function CheckOut() {
    const { setCartLength, cartItems, shippingPrice, } = useContext(CartContext)
    const { addressReauired, data } = useContext(addressContext);
    const [cartList, setCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const { priceCHange } = useContext(priceContext);
    useEffect(() => {
        setCartLength(cartItems?.numOfCartItems)
        setCartList(cartItems?.data?.products)
        setTotalPrice(cartItems?.data?.totalCartPrice)
    }, [cartItems])


    const shipAddress = {
        details: data?.details,
        phone: data?.phone,
        city: data?.city,
    }
    async function payNow(shippingAddress) {
        
        try {
            let { data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems?.data?._id}?url=http://localhost:3000`, {
                shippingAddress
            }, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            })
            toast.success('Order placed successfully!', { position: 'top-right', autoClose: 1500 });
            window.location.href = data.session.url
            setCartList([]);
        }
        catch (err) {
            toast.error(err.message, { position: 'top-right', autoClose: 1500 });
        }
    }
    return (
        <>
            <BgHeader mainName="Checkout" />
            <BreadCrumb product={{ title: "Checkout" }} />
            <Container fluid className='vh-100 p-5 bg-light mb-5 overflow-auto'>
                <Row className='mb-5'>
                    <Col md={6} className=''>
                        <UserAddress />
                    </Col>
                    <Col md={6} className={` ${styles.summaryContainer} `}>
                        <div className={`${styles.summary} ${styles.summaryCart} position-relative`}>
                            <h3 className={`${styles.summaryTitle}`}>Cart Total</h3>
                            <Table striped className={`${styles.summaryTable} table-summary`}>
                                <tbody>
                                    <tr className={`${styles.summaryRow}`}>
                                        <td className={`${styles.summaryLabel}`}>Subtotal:</td>
                                        <td className={`${styles.summaryValue}`}>
                                            {
                                                priceCHange === 'usd' ?
                                                    <>
                                                        {((totalPrice + shippingPrice) / 30).toFixed(2)}$
                                                    </> :
                                                    <>
                                                        {totalPrice + shippingPrice}EGP
                                                    </>
                                            }
                                        </td>
                                    </tr>
                                    <tr className={`${styles.summaryRow}`}>
                                        <td className={`${styles.summaryLabel}`}>Shipping:</td>
                                        <td className={`${styles.summaryValue}`}>{shippingPrice == 0 ? 'Free' : shippingPrice == 10 ? 'Standard' : 'Express'}</td>
                                    </tr>
                                    <tr className={`${styles.summaryTotal}`}>
                                        <td className={`${styles.summaryLabel}`}>Total:</td>
                                        <td className={`${styles.summaryValue}`}>
                                            {
                                                priceCHange === 'usd' ?
                                                    <>
                                                        {((totalPrice + shippingPrice) / 30).toFixed(2)}$
                                                    </> :
                                                    <>
                                                        {totalPrice + shippingPrice}EGP
                                                    </>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className={`${styles.summaryActions}  d-flex flex-column justify-content-center align-items-center my-4 `}>
                                <Button className={`btn buttonPurple w-50 btn-sm mt-4`} disabled={addressReauired} onClick={() => {
                                    payNow(shipAddress);
                                }} >
                                    <span>Pay Now</span>
                                </Button>
                                <Link
                                    to="/"
                                    className={`btn buttonBlue w-50 btn-sm mt-4`}
                                >
                                    <span>CONTINUE SHOPPING</span>
                                    <i className={`${styles.refreshIcon} icon-refresh`} />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
