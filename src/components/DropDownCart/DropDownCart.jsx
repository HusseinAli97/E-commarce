import style from './DropDownCart.module.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Dropdown, Button, Figure, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../context/Cart';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { priceContext } from '../../context/Price';



export default function DropDownCart() {
    const { cartLength, cartItems, deleteProductFromCart, setCartLength, isLoading } = useContext(CartContext);
    const { priceCHange } = useContext(priceContext);
    const [cartList, setCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate();
    const handleDeleteProduct = (productId) => {
        deleteProductFromCart(productId);
    };

    useEffect(() => {
        setCartLength(cartItems?.numOfCartItems)
        setCartList(cartItems)
        setTotalPrice(cartItems?.data?.totalCartPrice)
    }, [cartItems])
    const handleButtonClick = () => {
        navigate('/cart');
    };

    return (
        <>
            <Dropdown autoClose="outside">
                <Dropdown.Toggle variant="" className='border-0' id="dropdown-autoclose-outside" >
                    <i className={`fas fa-shopping-cart cartHover fa-lg me-2 ${style.cartHover}`}></i>
                    {
                        cartLength ?
                            <span className='mustard-Color  text-white quantity' id='cart'>{cartLength}</span>
                            :
                            isLoading ?
                                <i className='fa fa-spinner fa-spin'></i>
                                :
                                <span className='mustard-Color  text-white quantity' id='cart'>0</span>
                    }
                </Dropdown.Toggle >
                <Dropdown.Menu align="end" className={`border-0 ${style.dropdown}`} >
                    <Dropdown.Item className={` ${style.dropdownActions} border-0`}>
                        <div className={`d-flex align-items-center flex-column justify-content-between bgPurple-Color p-3 text-white  px-3`} >
                            <div className='d-flex align-items-center justify-content-between w-100'>
                                <h4 >Total:</h4>
                                {
                                    priceCHange === 'usd' ?
                                        <>
                                            {((totalPrice) / 30).toFixed(2)}$
                                        </> :
                                        <>
                                            {totalPrice}EGP
                                        </>
                                }
                            </div>
                            <div className='d-flex align-items-center justify-content-start w-100 border-bottom pb-2 '>
                                <h6 className='me-2'>Qty: </h6>{cartItems?.numOfCartItems}
                            </div>
                        </div>
                        <div className={`bgPurple-Color p-2`} >
                            <Row>
                                <Col xs={6}>
                                    <Button className={`w-100 ${style.toCart} buttonSec btn textHover border-0`} onClick={handleButtonClick} >
                                        <i className="fa-solid fa-cart-shopping fa-lg" />
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Button className={` w-100 ${style.checkout} buttonMain textHover border-0`} onClick={() => navigate('/checkout')} >
                                        <i className="fa-solid fa-money-check-dollar fa-lg" />
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Dropdown.Item>
                    <div className={`${style.dropdownWrapper} border-0`}>
                        {cartList?.data?.products.map((item, index) => (
                            <Fragment key={index}>
                                <Dropdown.Item className={`${style.dropdownItem}`}>
                                    <div className={`${style.productDetails}`} >
                                        <p className={`${style.productTitle} m-0 p-0`}>{item?.product?.title?.split(' ').slice(0, 2).join(' ')}</p>
                                        <span className={`${style.productPrice} m-0 p-0 mt-2 fw-light`}>{item?.count} x                                    {
                                            priceCHange === 'usd' ?
                                                <>
                                                    {((item?.price) / 30).toFixed(2)}$
                                                </> :
                                                <>
                                                    {item?.price}EGP
                                                </>
                                        }</span>
                                    </div>
                                    <div className={`${style.imgContainer} ml-2`}>
                                        <img src={item?.product?.imageCover} className={`${style.image}  w-100`} alt="" width={100} />
                                    </div>
                                    <Button onClick={() => handleDeleteProduct(item?.product?.id)} className={`${style.removeButton}  p-2 bg-danger text-white border-0`}>
                                        <i className="fa fa-xmark text-white " />
                                    </Button>
                                </Dropdown.Item>
                            </Fragment>
                        ))}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}