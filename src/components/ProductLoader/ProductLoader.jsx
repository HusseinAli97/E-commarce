import { useContext } from 'react';
import styles from './ProductLoader.module.css'
import ContentLoader from 'react-content-loader';
import { Container, Row, Col } from 'react-bootstrap';

export default function ProductLoader() {
    const productLength = 40
    return (
        <>
                    <ContentLoader
                        speed={1}
                        width={300}
                        height={400}
                        viewBox="0 0 300 400"
                        backgroundColor={'#333'}
                        foregroundColor={'#999'}
                    >
                        <rect x="0" y="0" rx="10" ry="10" width="100%" height="200" />
                        <rect x="20" y="220" rx="3" ry="3" width="80%" height="10" />
                        <rect x="20" y="240" rx="3" ry="3" width="60%" height="10" />
                        <rect x="20" y="260" rx="3" ry="3" width="70%" height="10" />
                    </ContentLoader>

        </>
    )
}
