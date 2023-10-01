import styles from './Brands.module.css'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { Col, Container, Row } from 'react-bootstrap'
import BgHeader from '../bgHeader/bgHeader'
import { useQuery } from 'react-query'
import axios from 'axios'
import ProductLoader from '../ProductLoader/ProductLoader'
import {Helmet} from "react-helmet";
export default function Brands() {
    const getBrands = () => axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    const { data, isLoading, isError } = useQuery('Brands', getBrands)
    const allBrands = data?.data.data
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <meta name="description" content="Brands" />
                <meta name="keywords" content="Brands" />
                <meta name="author" content="Hussein Ali" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="/brands" />
            </Helmet>
            <BgHeader mainName="Brands" subName="shop" />
            <BreadCrumb product={{ title: "Brands" }} />
            <Container fluid className={`p-0 p-5 bg-light d-flex justify-content-center align-items-center ${styles.BrandsContainer}`}>
                <Row className={`${styles.brandRow} g-5 p-5 `}>
                    {isLoading ?
                        Array.from({ length: 10 }).map((_, index) =>
                            <Col sm={12} md={6} lg={4} xl={4} key={index}>
                                <div className="products px-2 py-3">
                                    <ProductLoader key={index} />
                                </div>
                            </Col>
                        )
                        :
                        allBrands?.map((item, index) => (
                            <Col sm={12} md={6} lg={3} xl={3} key={item._id} >
                                <div className={`${styles.brandCard} `}>
                                    <Link to={`/Brands/${item.id}`} className='nav-link'>
                                        <div className="content">
                                            <img src={item.image} alt="" className={`${styles.brandImage} `} />
                                            <div className={`${styles.overlay}`}>
                                                <p className={` m-0 ${styles.brandName}`}>{item.name} </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}