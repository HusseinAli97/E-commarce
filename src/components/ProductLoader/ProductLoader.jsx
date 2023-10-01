import { useContext } from 'react';
import styles from './ProductLoader.module.css'
import ContentLoader from 'react-content-loader';
import { Container, Row, Col } from 'react-bootstrap';

export default function ProductLoader() {
    return (
        <>
                    <ContentLoader
                        speed={1}
                        width={300}
                        height={400}
                        viewBox="0 0 300 400"
                        backgroundColor={'#eee'}
                        foregroundColor={'#fff'}
                        className={`${styles.ProductLoader}`}
                    >
                        <rect x="0" y="0" rx="10" ry="10" width="100%" height="200" />
                        <rect x="20" y="250" rx="3" ry="3" width="80%" height="10" />
                        <rect x="20" y="270" rx="3" ry="3" width="60%" height="10" />
                        <rect x="20" y="290" rx="3" ry="3" width="70%" height="10" />
                        <rect x="10" y="310" rx="3" ry="3" width="25%" height="20" />
                        <rect x="200" y="310" rx="3" ry="3" width="25%" height="20" />
                    </ContentLoader>

        </>
    )
}
