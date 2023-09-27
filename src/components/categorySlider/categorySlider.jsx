import Slider from "react-slick";
import styles from './categorySlider.module.css'
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";



export default function CategorySlider() {
    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data } = useQuery('categories', getCategories);
    const settings = {
        dots: false,
        navigator: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "ease",
    };
    return (
        <div>
            <Slider {...settings}>
                {data?.data.data.map((item, index) => {
                    return (
                            <div key={index} className={`${styles.categorySlider} p-2`}>
                                <Link to={`/categories/${item.id}`} className='nav-link'>
                                    <img src={item.image} alt="" className={styles.categoryImage} />
                                    <p className={`${styles.categoryName}`}>{item.name} </p>
                                </Link>
                            </div>
                    )
                })}
            </Slider>
        </div>
    );
}