import styles from './categorySlider.module.css'
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import { Autoplay, FreeMode, Keyboard } from 'swiper/modules';


export default function CategorySlider() {
    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data } = useQuery('categories', getCategories);
    return (
        <div>
            <Swiper
                spaceBetween={10}
                grabCursor={true}
                loop={true}
                freeMode={true}
                keyboard={{
                    enabled: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1000: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1050: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                }}
                autoplay={{
                    delay: 4000,
                }}
                modules={[Autoplay, FreeMode, Keyboard]}
                className={styles.mySwiper}>
                {data?.data.data.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className={styles.categoryCard}>
                            <div key={index} className={`${styles.categorySlider} p-2`}>
                                <div className={`${styles.categoryCard} position-relative`}>
                                    <img src={item.image} alt="" className={styles.categoryImage} />
                                    <Link to={`/categories/${item.id}`} className='nav-link'>
                                        <div className={styles.overlay}>
                                            <p className={`${styles.categoryName} d-flex align-items-center justify-content-center m-0 me-1`}>{item.name}<i className="fas fa-arrow-right" /> </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}