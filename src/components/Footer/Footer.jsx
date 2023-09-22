import { Container } from 'react-bootstrap'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <Container fluid property='footer' className={`bg-dark ${localStorage.getItem('userToken')?'':"fixed-bottom"} py-3`}>
            <p className='text-center text-light'>© 2022 Copyright</p>
        </Container>
    )
}
