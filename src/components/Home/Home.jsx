import { useContext, useEffect } from 'react'
import styles from './Home.module.css'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import HomeSlider from '../homeSlider/homeSlider'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../context/Cart'


export default function Home() {

    return (
        <div className={`text-center`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <meta name="description" content="Home" />
                <meta name="keywords" content="Home" />
                <meta name="author" content="Hussein Ali" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="/home" />
            </Helmet>
            <HomeSlider />
            <FeatureProduct />
        </div>
    )
}
