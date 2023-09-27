import styles from './BreadCrumb.module.css'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
export default function BreadCrumb({ product, params }) {
    
    return (
        <Nav className={` px-0 px-4 pb-2 pt-4 mt-5 ${styles.breadcrumbNav}`}>
        <ul className={`${styles.breadcrumb}`}>
            <li>
                <Link to="/" className={`${styles.breadcrumbItem}`}>
                    Home
                </Link>
            </li>
            <li>
                <Link to="/products" className={`${styles.breadcrumbItem}`}>
                    Products
                </Link>
            </li>
            <li>
                <Link
                    to={`/`}
                    className={`${styles.breadcrumbItem} ${styles.active}`}
                >
                    {product?.title.split(" ").slice(0, 3).join(" ")}
                </Link>
            </li>
            <li></li>
        </ul>
    </Nav>
    )
}
