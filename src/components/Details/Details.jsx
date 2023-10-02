import { Link, useParams } from 'react-router-dom'
import styles from './Details.module.css'
import axios from 'axios';
// import { useQuery } from 'react-query';
import ProductLoader from '../ProductLoader/ProductLoader';
import { Container, Row, Col, Button, Nav, Tab, Tabs, Breadcrumb } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AsNavFor from '../productDeatilsCarassoul/productDeatilsCarassoul';
import ReactStars from "react-rating-stars-component";
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../../context/Cart';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import Heart from 'react-heart';
import { Helmet } from 'react-helmet';
import BgHeader from '../bgHeader/bgHeader';
import { priceContext } from '../../context/Price';

export default function Details() {
    const { priceCHange } = useContext(priceContext);
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart, setCartLength, updateProductQty, cartItems } = useContext(CartContext)
    const [key, setKey] = useState('Description');
    const [active, setActive] = useState(false)


    const callCart = async (productId) => {
        let { data } = await addToCart(productId)
        setCartLength(data?.numOfCartItems)
        if (data.status === 'success') {
            toast.success(data.message, { position: "top-right" });
        } else {
            toast.error(data.message, { position: "top-right" });
        }
    }
    async function getProduct(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProduct(data.data)
        setIsLoading(false)
    }
    useEffect(() => {
        getProduct(params.id)
    }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{product?.title}</title>
                <meta name="description" content="Details" />
                <meta name="keywords" content="Details" />
                <meta name="author" content="Hussein Ali" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="/details" />
            </Helmet>

            {isLoading ? (
                <>
                    <ProductLoader />
                </>
            ) : (
                <>
                    <BgHeader mainName="details" subName={product?.title} />
                    <BreadCrumb product={product} params={params} />
                    <Container fluid className="bg-light pb-5 mb-5">
                        <div className="topContent mb-5" style={{height: 'fit-content'}}>
                            <Row className="px-5 ">
                                <Col md={4}>
                                    <div className="Gallery mt-4">
                                        <AsNavFor images={product?.images}  />
                                    </div>
                                </Col>
                                <Col md={8} className='' style={{ position: "relative" }}>
                                    <div className="productDetails p-5 mt-4">
                                        <h2 className={`${styles.title} mb-1`}>
                                            {product?.title}
                                        </h2>
                                        <div
                                            className={`${styles.rating} d-flex align-items-center mb-2 justify-content-start`}
                                        >
                                            <ReactStars
                                                size={19}
                                                value={product?.ratingsAverage}
                                                isHalf={true}
                                                edit={false}
                                                activeColor={"#ff8220"}
                                            />
                                            <p className="m-0 ms-2 review text-muted">
                                                ({product?.ratingsQuantity} Reviews)
                                            </p>
                                        </div>
                                        <h3 className={`${styles.price} m-0 mb-2`}>
                                            {
                                                priceCHange === 'usd' ?
                                                    `$${(product?.price / 30).toFixed(2)}`
                                                    :
                                                    `${product?.price}EGP`
                                            }
                                        </h3>
                                        <div className={`${styles.topContent} mt-4`}>
                                            <p className={`${styles.description} text-muted mb-2 `}>
                                                {product?.description}
                                            </p>
                                            <div
                                                className={`${styles.buttonContainer} d-flex align-items-center mt-4 position-relative`}
                                            >
                                                <Button
                                                    onClick={() => {
                                                        callCart(params.id)

                                                    }}
                                                    className={`${styles.button} ${styles.addToCart} btn-lg buttonPurple me-5`}
                                                >
                                                    <i className="fa fa-cart-shopping me-2 "></i>
                                                    Add to Cart
                                                </Button>
                                            </div>
                                            <div className="border-bottom mt-4" />
                                            <div className="category d-flex align-items-center mt-2">
                                                <p className="m-0 me-2">Category: </p>
                                                <p className="m-0"> {product?.category?.name}</p>
                                            </div>
                                            <div className="social d-flex align-items-center mt-4">
                                                <p className="m-0 text-muted">Share:</p>
                                                <ul className="list-unstyled d-flex align-items-center m-0 p-0 ms-3 ">
                                                    <li className="me-3">
                                                        <a
                                                            href="https://www.facebook.com/"
                                                            target="_blank"
                                                            className="text-decoration-none nav-link textHover"
                                                        >
                                                            <i className="fa-brands fa-lg fa-facebook"></i>
                                                        </a>
                                                    </li>
                                                    <li className="me-3">
                                                        <a
                                                            href="https://www.twitter.com/"
                                                            target="_blank"
                                                            className="text-decoration-none nav-link textHover"
                                                        >
                                                            <i className="fa-brands fa-lg fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li className="me-3">
                                                        <a
                                                            href="https://www.instagram.com/"
                                                            target="_blank"
                                                            className="text-decoration-none nav-link textHover"
                                                        >
                                                            <i className="fa-brands fa-lg fa-instagram"></i>
                                                        </a>
                                                    </li>
                                                    <li className="me-3">
                                                        <a
                                                            href="https://www.pinterest.com/"
                                                            target="_blank"
                                                            className="text-decoration-none nav-link textHover"
                                                        >
                                                            <i className="fa-brands fa-lg fa-pinterest"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="bottomContent border-2">
                            <Row className="px-5">
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className={`mb-3 d-flex align-items-center justify-content-center tabContainer`}
                                >
                                    <Tab eventKey="Description" title="Description">
                                        <div
                                            className={`product-desc-content ${styles.descContainer} px-5`}
                                        >
                                            <h3 className={`${styles.descTitle} mb-1`}>
                                                Product Information
                                            </h3>
                                            <p
                                                className={`pb-1 ${styles.descText1} text-muted ps-3`}
                                            >
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing
                                                elit. Donec odio. Quisque volutpat mattis eros. Nullam
                                                malesuada erat ut turpis. Suspendisse urna viverra
                                                non, semper suscipit, posuere a, pede. Donec nec justo
                                                eget felis facilisis fermentum. Aliquam porttitor
                                                mauris sit amet orci. Aenean dignissim pellentesque
                                                felis. Phasellus ultrices nulla quis nibh. Quisque a
                                                lectus. Donec consectetuer ligula vulputate sem
                                                tristique cursus.
                                            </p>
                                            <ul className={`${styles.descText2} ps-5`}>
                                                <li>
                                                    Nunc nec porttitor turpis. In eu risus enim. In
                                                    vitae mollis elit.{" "}
                                                </li>
                                                <li>Vivamus finibus vel mauris ut vehicula.</li>
                                                <li>
                                                    Nullam a magna porttitor, dictum risus nec, faucibus
                                                    sapien.
                                                </li>
                                            </ul>
                                            <p className={` ${styles.descText3} ps-2 text-muted`}>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing
                                                elit. Donec odio. Quisque volutpat mattis eros. Nullam
                                                malesuada erat ut turpis. Suspendisse urna viverra
                                                non, semper suscipit, posuere a, pede. Donec nec justo
                                                eget felis facilisis fermentum. Aliquam porttitor
                                                mauris sit amet orci. Aenean dignissim pellentesque
                                                felis. Phasellus ultrices nulla quis nibh. Quisque a
                                                lectus. Donec consectetuer ligula vulputate sem
                                                tristique cursus.{" "}
                                            </p>
                                        </div>
                                    </Tab>
                                    <Tab
                                        eventKey="Additional-Information"
                                        title="Additional Information"
                                    >
                                        <div
                                            className={`product-desc-content ${styles.descContainer} px-5`}
                                        >
                                            <h3 className={`${styles.descTitle} mb-1`}>
                                                Information
                                            </h3>
                                            <p
                                                className={`pb-1 ${styles.descText1} text-muted ps-3`}
                                            >
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing
                                                elit. Donec odio. Quisque volutpat mattis eros. Nullam
                                                malesuada erat ut turpis. Suspendisse urna viverra
                                                non, semper suscipit, posuere a, pede. Donec nec justo
                                                eget felis facilisis fermentum. Aliquam porttitor
                                                mauris sit amet orci.{" "}
                                            </p>
                                            <h3 className={`${styles.descTitle} pt-2`}>
                                                Fabric &amp; care
                                            </h3>
                                            <ul className={`${styles.descText2} ps-5`}>
                                                <li>Faux suede fabric</li>
                                                <li>Gold tone metal hoop handles.</li>
                                                <li>RI branding</li>
                                                <li>Snake print trim interior </li>
                                                <li>Adjustable cross body strap</li>
                                                <li>
                                                    {" "}
                                                    Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop:
                                                    61cm
                                                </li>
                                            </ul>
                                            <h3 className={`${styles.descTitle} pt-2`}>Size</h3>
                                            <p>one size</p>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Shipping-Returns" title="Shipping & Returns">
                                        <div className={`product-desc-content ${styles.descContainer} px-5`}>
                                            <h3 className={`${styles.descTitle} mb-1`}>Delivery &amp; returns</h3>
                                            <p className={`pb-1 ${styles.descText1} text-muted ps-3`}>
                                                We deliver to over 100 countries around the world. For
                                                full details of the delivery options we offer, please
                                                view our{" "}
                                                <Link to="/">
                                                    Delivery information
                                                </Link>
                                                <br />
                                                We hope you’ll love every purchase, but if you ever
                                                need to return an item you can do so within a month of
                                                receipt. For full details of how to make a return,
                                                please view our{" "}
                                                <Link to="/">
                                                    Returns information
                                                </Link>
                                            </p>
                                        </div>
                                    </Tab>
                                    <Tab
                                        eventKey="Reviews"
                                        title={`Reviews (${product?.ratingsQuantity})`}
                                    >
                                        <h3 className={`${styles.descTitle} mb-1`}>
                                            Reviews ({product?.ratingsQuantity})
                                        </h3>
                                    </Tab>
                                </Tabs>
                            </Row>
                        </div>
                    </Container>
                </>
            )}
        </>
    );
}
