import styles from './ProductCard.module.css'
import { Col, Row, Badge, Stack } from 'react-bootstrap';
import { useState } from 'react';
import Heart from 'react-heart';
import * as React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../../../context/Cart';
import { wishListContext } from '../../../context/WishList';
import { priceContext } from '../../../context/Price';





export default function ProductCard({ product }) {
    const [likedProducts, setLikedProducts] = useState({});
    const { sold, category, imageCover, price, quantity, ratingsAverage, title, brand, _id } = product
    const { priceCHange } = useContext(priceContext);
    const { name: categoryName } = category
    const { name: brandName } = brand
    const { addToCart, setCartLength, } = useContext(CartContext)
    const { addToWishList, wishListItems, deleteFromWshList, wishListId } = useContext(wishListContext)
    const navigate = useNavigate();

    const callCart = async (productId) => {
        let { data } = await addToCart(productId)
        setCartLength(data?.numOfCartItems)
        if (data.status === 'success') {
            toast.success(data.message, { position: "top-center" });
        } else {
            toast.error(data.message, { position: "top-center" });
        }
    }
    useEffect(() => {
        const initialLikedProducts = {};
        wishListId.forEach((productId) => {
            initialLikedProducts[productId] = true;
        });
        setLikedProducts(initialLikedProducts);
    }, [wishListItems]);


    function handelWishList(id) {
        if (likedProducts[id]) {
            // Remove the product from the wish list
            deleteFromWshList(id)
                .then((response) => {
                    if (response.data.status === 'success') {
                        // Update the likedProducts state
                        setLikedProducts((prevState) => ({
                            ...prevState,
                            [id]: false,
                        }));
                    }
                })
        } else {
            // Add the product to the wish list
            addToWishList(id)
                .then((response) => {
                    if (response.data.status === 'success') {
                        // Update the likedProducts state
                        setLikedProducts((prevState) => ({
                            ...prevState,
                            [id]: true,
                        }));
                    }
                })
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
                        <div className={`${styles.price}`}>
                            {
                                priceCHange === 'usd' ?
                                    `$${(price / 30).toFixed(2)}`
                                    :
                                    `${price}EGP`
                            }
                        </div>
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
                            <div className={`${styles.heart}`} style={{ width: "2rem" }}>
                                <Heart

                                    isActive={likedProducts[_id] || false}
                                    onClick={() => {
                                        handelWishList(_id);
                                    }}
                                    animationScale={1.2}
                                    animationTrigger="both"
                                    className={`customHeart${likedProducts[_id] ? ' active' : ''}`}
                                />
                            </div>
                        </Col>
                        <Col md={12} className={`${styles.buttonContainer}`}>
                            <button className={`${styles.button} ${styles.buyButton}`} onClick={() => {
                                callCart(_id)
                                navigate('/checkout')
                            }}>
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
