import styles from './bgHeader.module.css'
import { Container } from 'react-bootstrap'
export default function BgHeader(props) {
    return (
        <div className={`${styles.pageHeader} text-center mt-5`}>
            <Container fluid className='mt-5' >
                <div className={`${styles.loader}`}>
                    <p className={`${styles.text}`}>
                        {props.mainName}<br />{props.subName}
                    </p>
                </div>
            </Container>
        </div>
    )
}
