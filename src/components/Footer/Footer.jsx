import { Container } from 'react-bootstrap'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        // <Container fluid property='footer' className={`bg-dark ${localStorage.getItem('userToken')?'':"fixed-bottom"} py-3`}>
        <>
            {
                localStorage.getItem('userToken') &&
                <Container fluid property='footer' className={`bg-dark ${styles.footer} py-3`}>
                    <div className="text-center text-white">
                        <p>Copyright © 2022 All rights reserved</p>
                    </div>
                </Container>
            }
        </>
    )
}
