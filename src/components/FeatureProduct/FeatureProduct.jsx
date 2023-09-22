import { useEffect, useState, useContext } from 'react';
import styles from './FeatureProduct.module.css'
import ProductLoader from '../ProductLoader/ProductLoader'; 
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Shared/ProductCard/ProductCard';
import CarasoulProduct from '../Carasoul/Carasoul';


export default function FeatureProduct() {
    const allProductApi = ('https://ecommerce.routemisr.com/api/v1/products')
    let [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true);
    async function getProducts() {
        let { data } = await axios.get(allProductApi);
        setProducts(data.data)
        setLoading(false)
    }
    useEffect(() => {
        getProducts()
    }, true)
    return (
        <>
            <CarasoulProduct />
            <Container className='py-5'>
                <Row className='g-5 '>
                    {isLoading ? (
                        Array.from({ length: 40 }).map((_, index) => 
                        <Col sm={12} md={6} lg={4} xl={3} key={index}>
                            <div className="products px-2 py-3">
                        <ProductLoader key={index} />
                            </div>
                        </Col>
                        )
                    ) : (
                        products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <div className="products px-2 py-3">
                                    <ProductCard product={product} />
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    )
}
