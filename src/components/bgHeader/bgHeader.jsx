import styles from './bgHeader.module.css'
import { Container } from 'react-bootstrap'
export default function BgHeader(props) {
    return (
        <div className={`${styles.pageHeader} text-center`}>
            <Container fluid>
                <div className={`${styles.loader}`}>
                    <p className={`${styles.text}`}>
                        {props.mainName}<br />{props.subName}
                    </p>
                </div>
            </Container>
        </div>
    )
}
