import styles from './ProductCard.module.css'
import { Col, Row, Badge, Stack } from 'react-bootstrap';
import { useState } from 'react';
import Heart from 'react-heart';
import * as React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../../../context/Cart';




export default function ProductCard({ product }) {
    let { sold, category, imageCover, price, quantity, ratingsAverage, title, brand, _id } = product
    let { name: categoryName } = category
    let { name: brandName } = brand
    const [active, setActive] = useState(false)
    let { addToCart, setCartLength } = useContext(CartContext)
    const [inCart, setInCart] = useState(false);

    const callCart = async (productId) => {
        let { data } = await addToCart(productId)
        setCartLength(data?.numOfCartItems)
        if (data.status === 'success') {
            toast.success(data.message, { position: "top-right" });
            setInCart(true);
        } else {
            toast.error(data.message, { position: "top-right" });
        }
    }

    return (
        <div className={` ${styles.card}`}>
            <Link to={`/details/${_id}`} className="text-decoration-none">
                <div className={`${styles.overlay} mt-2`}>
                    <div className={`${styles.brand}`}>
                        <Badge bg='dark'>
                            {brandName}
                        </Badge>
                    </div>
                    <div className={`${styles.productName} `}>
                        <Badge>
                            {title.split(' ').slice(0, 3).join(' ')}
                        </Badge>
                    </div>
                </div>
                <div className={`${styles.imageContainer} overflow-hidden`}>
                    <img src={imageCover} className={`${styles.image}  w-100`} alt="" />
                    <div className={`${styles.overlay}`}>
                    </div>
                    <div className={`${styles.cat} position-absolute `}>
                        <Badge>
                            {categoryName}
                        </Badge>
                    </div>
                </div>
            </Link>
            {/* Content */}
            <div className={`${styles.content} `}>
                <div className={`${styles.infoContainer} d-flex flex-column p-2 overflow-hidden`}>
                    <Row>
                        <div className={`${styles.price}`}> ${price}</div>
                        <Col md={12} className='d-flex align-items-center justify-content-center'>
                            <div className="rating ">
                                <ReactStars size={22} value={ratingsAverage} isHalf={true} edit={false}
                                    activeColor={"#ff8220"}
                                />
                            </div>
                        </Col>
                        <Col md={12} className={`${styles.badeges}`}>
                            <Stack direction="horizontal" className="d-flex align-items-center flex-wrap mb-3" gap={2}>
                                <div className='me-auto d-flex align-items-center justify-content-center'>
                                    Qty:<Badge className={`${styles.badge}`}>{quantity}</Badge>
                                </div>
                                <div className='ms-auto d-flex align-items-center justify-content-center'>
                                    Sold:<Badge className={`${styles.badge}`}>{sold}</Badge>
                                </div>
                            </Stack>
                        </Col>
                        <Col md={12} >
                                <div className={`${styles.heart}`} style={{ width: "2rem" } }>
                                    <Heart isActive={active} onClick={() => setActive(!active)} animationScale={1.2} animationTrigger="both" className={`customHeart${active ? " active" : ""}`} />
                                </div>
                        </Col>
                        <Col md={12} className={`${styles.buttonContainer}`}>
                            <button className={`${styles.button} ${styles.buyButton}`}>
                                <i className="fa-solid fa-rotate-90  fa-money-check-dollar "></i>
                            </button>
                            <button onClick={() => {
                                callCart(_id)
                            }} className={`${styles.button} ${styles.cartButton}`} >
                                <i className="fa-solid fa-rotate-90  fa-cart-shopping"></i>
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
