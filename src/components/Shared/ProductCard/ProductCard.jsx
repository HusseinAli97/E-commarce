import styles from './ProductCard.module.css'
import { Col, Row, Badge, Stack } from 'react-bootstrap';
import { useState } from 'react';
import Heart from "react-animated-heart";
import * as React from 'react';
import ReactStars from "react-rating-stars-component";



export default function ProductCard({ product }) {
    let { sold, category, imageCover, price, quantity, ratingsAverage, title, brand } = product
    let { name: categoryName } = category
    let { name: brandName } = brand
    let [isClick, setClick] = useState(false);
    return (
        <div className={` ${styles.card}`}>
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
            <div className={`${styles.imageContainer}`}>
                <img src={imageCover} className={`${styles.image}  w-100`} alt="" />
                <div className={`${styles.overlay}`}>
                </div>
                <div className={`${styles.cat} position-absolute `}>
                    <Badge>
                        {categoryName}
                    </Badge>
                </div>
                <div className={`${styles.price}`}> ${price}</div>

            </div>
            <div className={`${styles.content} `}>
                <div className={`${styles.infoContainer} d-flex flex-column p-2 overflow-hidden`}>
                    <Row>
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
                            <div className={`${styles.heart} `}>
                            <Heart   isClick={isClick}  onClick={() => setClick(!isClick)} />
                            </div>
                        </Col>
                        <Col md={12} className={`${styles.buttonContainer}`}>
                            <button className={`${styles.button} ${styles.buyButton}`}>
                                <i class="fa-solid fa-rotate-90  fa-money-check-dollar "></i>
                            </button>
                            <button className={`${styles.button} ${styles.cartButton}`}>
                                <i className="fa-solid fa-rotate-90  fa-cart-shopping"></i>
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
