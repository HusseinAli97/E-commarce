import { useContext } from 'react'
import styles from './Home.module.css'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import HomeSlider from '../homeSlider/homeSlider'

export default function Home() {
    return (
        <div className={`text-center`}>
            <HomeSlider />
            <FeatureProduct />
        </div>
    )
}
