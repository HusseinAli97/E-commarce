import { useContext } from 'react'
import styles from './Home.module.css'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
export default function Home() {
    return (
        <div className={`text-center`}>
            <FeatureProduct />
        </div>
    )
}
