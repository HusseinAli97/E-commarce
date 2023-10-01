import { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Button, Table, FormCheck } from 'react-bootstrap';
import styles from './Cart.module.css'
import { CartContext } from '../../context/Cart';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import ProductLoader from '../ProductLoader/ProductLoader';
import BgHeader from '../bgHeader/bgHeader';
import {Helmet} from "react-helmet";
import { priceContext } from '../../context/Price';


export default function Cart() {
    const { setCartLength, updateProductQty, cartItems, isLoading, deleteProductFromCart, shippingPrice, setShippingPrice } = useContext(CartContext)
    const [cartList, setCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const { priceCHange } = useContext(priceContext);


    const handleProductCount = (productId, event) => {
        updateProductQty(productId, Number(event.target.value))
    }
    const handleDeleteProduct = (productId) => {
        deleteProductFromCart(productId);
    };


    useEffect(() => {
        setCartLength(cartItems?.numOfCartItems)
        setCartList(cartItems?.data?.products)
        setTotalPrice(cartItems?.data?.totalCartPrice)
    }, [cartItems])

    return (
        <div className="main">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Shopping Cart</title>
                <meta name="description" content="Shopping Cart" />
                <meta name="keywords" content="Shopping Cart" />
                <meta name="author" content="Hussein Ali" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="/shopping-cart" />
            </Helmet>
            <BgHeader mainName="Shopping Cart" subName="shop" />
            <div className={`${styles.pageContent} pb-5`}>
                {isLoading ? <>
                    <ProductLoader />
                </> : <>
                    <BreadCrumb product={{ title: "Shopping Cart" }} />
                    {cartList?.length > 0 ? (
                        <div className="cart">
                            <Container fluid className='pb-5 '>
                                <Row className="pb-5">
                                    <Col lg={9} className='p-0'>
                                        <Table
                                            striped
                                            variant="white"
                                            hover
                                            responsive="sm"
                                            size="sm"
                                            className={`table ${styles.tableCart} table-mobile`}>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                    <th>Del</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartList?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className={`${styles.productCol}`}>
                                                            <div className={`${styles.product}`}>
                                                                <div className={`${styles.productMedia}`}>
                                                                    <Link className={`${styles.productImg}`} to={`/details/${item.product._id}`}>
                                                                        <img
                                                                            src={item.product.imageCover}
                                                                            alt="product"
                                                                            className="img-fluid rounded-4"
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <h4 className={`${styles.productName}  textHover `}>
                                                                    {item?.product.title.split(' ').slice(0, 2).join(' ')}
                                                                </h4>
                                                            </div>
                                                        </td>
                                                        <td className={`${styles.priceCol}`}>
                                                            {
                                                                priceCHange === 'usd' ?
                                                                    <>
                                                                        {(item.price / 30).toFixed(2)}<span className="fs-6">$</span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {item.price}<span className="fs-6">EGP</span>
                                                                    </>
                                                            }
                                                        </td>
                                                        <td className={`${styles.quantityCol} `}>
                                                            <div className=" text-center mx-auto ">
                                                                <input
                                                                    type="number"
                                                                    className="form-control text-center w-100"
                                                                    min={1}
                                                                    max={10000}
                                                                    required
                                                                    defaultValue={item.count}
                                                                    onChange={(e) => {
                                                                        handleProductCount(item.product.id, e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className={`${styles.totalCol}`}>
                                                            {
                                                                priceCHange === 'usd' ?
                                                                    <>
                                                                        {((item.price * item.count) / 30).toFixed(2)}<span className="fs-6">$</span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {item.price * item.count}<span className="fs-6">EGP</span>
                                                                    </>
                                                            }
                                                        </td>
                                                        <td className="remove-col">
                                                            <Button onClick={() => handleDeleteProduct(item.product.id)} className="bg-transparent text-white pink-Color border-0">
                                                                <i className="fa fa-trash fa-lg" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col lg={3} className={`${styles.summaryContainer} `}>
                                        <div className={`${styles.summary} ${styles.summaryCart} position-relative`}>
                                            <h3 className={`${styles.summaryTitle}`}>Cart Total</h3>
                                            <Table striped className={`${styles.summaryTable} table-summary`}>
                                                <tbody>
                                                    <tr className={`${styles.summaryRow}`}>
                                                        <td className={`${styles.summaryLabel}`}>Subtotal:</td>
                                                        <td className={`${styles.summaryValue}`}>{totalPrice}EGP</td>
                                                    </tr>
                                                    <tr className={`${styles.summaryRow}`}>
                                                        <td className={`${styles.summaryLabel}`}>Shipping:</td>
                                                        <td className={`${styles.summaryValue}`}>{shippingPrice == 0 ? 'Free' : shippingPrice == 10 ? 'Standard' : 'Express'}</td>
                                                    </tr>
                                                    <tr className={`${styles.summaryShippingRow}`}>
                                                        <td>
                                                            <div className={`${styles.customRadio}`}>
                                                                <FormCheck
                                                                    type="radio"
                                                                    id="free-shipping"
                                                                    name="shipping"
                                                                    label="Free Shipping"
                                                                    onChange={() => setShippingPrice(0)}
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className={`${styles.summaryValue}`}>0.00EGP</td>
                                                    </tr>
                                                    <tr className={`${styles.summaryShippingRow}`}>
                                                        <td>
                                                            <div className={`${styles.customRadio}`}>
                                                                <FormCheck
                                                                    type="radio"
                                                                    id="standard-shipping"
                                                                    name="shipping"
                                                                    label="Standard:"
                                                                    onChange={() => setShippingPrice(10)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className={`${styles.summaryValue}`}>
                                                            {
                                                                priceCHange === 'usd' ?
                                                                    <>
                                                                        {(10 / 30).toFixed(2)}$
                                                                    </> :
                                                                    <>
                                                                        {10}EGP
                                                                    </>
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr className={`${styles.summaryShippingRow}`}>
                                                        <td>
                                                            <div className={`${styles.customRadio}`}>
                                                                <FormCheck
                                                                    type="radio"
                                                                    id="express-shipping"
                                                                    name="shipping"
                                                                    label="Express:"
                                                                    onChange={() => setShippingPrice(20)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className={`${styles.summaryValue}`}>
                                                            {
                                                                priceCHange === 'usd' ?
                                                                    <>
                                                                        {(20 / 30).toFixed(2)}$
                                                                    </> :
                                                                    <>
                                                                        {20}EGP
                                                                    </>
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr className={`${styles.summaryShippingEstimate}`}>
                                                        <td className={`${styles.summaryLabel}`}>
                                                            Estimate for Your Country
                                                        </td>
                                                        <td className={`${styles.summaryValue}`}>
                                                            <Link to={'/'}
                                                                className={`${styles.changeAddressLink}`}>
                                                                Change address
                                                            </Link>
                                                        </td>
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
                                            <div className={`${styles.summaryActions}  d-flex flex-column justify-content-center align-items-center mt-4`}>
                                                <Link
                                                    to="/checkout"
                                                    className={`btn buttonPurple w-100 btn-sm mt-4`}
                                                >
                                                    PROCEED TO CHECKOUT
                                                </Link>
                                                <Link
                                                    to="/"
                                                    className={`btn buttonBlue w-100 btn-sm mt-4`}
                                                >
                                                    <span>CONTINUE SHOPPING</span>
                                                    <i className={`${styles.refreshIcon} icon-refresh`} />
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    ) : (
                        <Container fluid className="emptyContainer bg-light py-5 my-5 d-flex justify-content-center align-items-center">
                            <div className={`${styles.emptyCart}`}>
                                <h1 className="text-center">Your Cart is Empty</h1>
                                <p className="text-center">It looks like your cart is empty. Start shopping now!</p>
                                <div className="text-center mt-4">
                                    <Link to="/" className={`${styles.btn} `}>
                                        <span>Shop Now</span>
                                    </Link>
                                </div>
                            </div>
                        </Container>
                    )}
                </>}
            </div>
        </div>
    );
}
