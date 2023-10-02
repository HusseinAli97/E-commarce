import styles from './Error404.module.css'
import error from '../../images/assits/Error/404.png'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Error404() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>404</title>
                <meta name="description" content="Error 404" />
                <meta name="keywords" content="Error 404" />
                <meta name="author" content="Hussein Ali" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="/error-404" />
            </Helmet>
            <Container fluid className={`d-flex justify-content-center align-items-center bg-light vh-100 `}>
                <img src={error} alt="" className="img-fluid mx-auto  "  width={500} height={500}/>
            </Container>
        </>
    )
}
