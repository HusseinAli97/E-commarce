import { useEffect, useState, useContext } from 'react';
import styles from './FeatureProduct.module.css'
import ProductLoader from '../ProductLoader/ProductLoader';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Shared/ProductCard/ProductCard';
import CarasoulProduct from '../Carasoul/Carasoul';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import BgHeader from '../bgHeader/bgHeader';


export default function FeatureProduct() {
    const allProductApi = ('https://ecommerce.routemisr.com/api/v1/products')
    function featureProduct() {
        return axios.get(allProductApi)
    }
    let { data, isLoading, isError } = useQuery('featureProducts', featureProduct);
    let products = data?.data.data
    return (
        < >
            <CarasoulProduct />
            <div className='bg-white rounded-5'>
                <div className='pb-5 mb-2'>
                    <BgHeader mainName="Popular" subName="Product" />
                </div>
                <Container className='pb-5 mb-5'>
                    <Row className='g-5 mb-3 '>
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
                                        <ProductCard product={product} />
                                </Col>
                                
                            ))
                        )}
                    </Row>
                </Container>
            </div>
        </>
    )
}
