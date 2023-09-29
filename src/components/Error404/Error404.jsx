import styles from './Error404.module.css'
import error from '../../images/assits/Error/404.png'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
export default function Error404() {
    return (
        <Container fluid className={`d-flex justify-content-center align-items-end bg-light  emptyContainer`}>
            <img src={error} alt="" className="img-fluid position-relative bottom-0 " />            
            </Container>
    )
}
