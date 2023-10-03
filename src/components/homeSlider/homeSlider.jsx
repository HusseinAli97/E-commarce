import { Container, Row, Badge } from "react-bootstrap";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-flip";
import "../Shared/Styles/Swiper.css";
import styles from "./homeSlider.module.css";
import product1 from "../../images/assits/mainSlider/product1.jpg";
import product2 from "../../images/assits/mainSlider/product2.jpg";
import product3 from "../../images/assits/mainSlider/product3.jpg";
import product4 from "../../images/assits/mainSlider/product4.jpg";
import product5 from "../../images/assits/mainSlider/product5.jpg";
import CategorySlider from "../categorySlider/categorySlider";
import { useNavigate } from "react-router-dom";

export default function HomeSlider() {
    const navigate = useNavigate()
    return (
        <Container fluid className={`p-0 px-1 mt-5 `}>
            <Swiper
                effect={"fade"}
                grabCursor={true}
                modules={[Autoplay, EffectFade]}
                spaceBetween={30}
                loop={true}
                centeredSlides={true}
                autoplay={{
                    delay: 6000,
                }}
                className={styles.swiper}
            >
                <SwiperSlide>
                    <img src={product1} alt="" className="img-fluid " />
                    <Container className={styles.introContent}>
                        <Row>
                            <div className={styles.intro}>
                                <div className={styles.introTitle}>
                                    <h3>Groceries</h3>
                                </div>
                                <div className={styles.content}>
                                    <h3>
                                        <Badge bg='dark'>
                                        Shop Fresh
                                        </Badge>
                                        </h3>
                                    <h3>Vegetables &amp; Fruits</h3>
                                </div>
                                <div className={styles.offer}>
                                    <h3>SAVE UP TO 25%</h3>
                                </div>
                                <div className="action">
                                    <button className="buttonPurple px-5 py-2 "  onClick={()=>{
                                        navigate("/categories")
                                    }}>Shop Now</button>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={product2} alt="" className="img-fluid" />
                    <Container className={styles.introContent}>
                        <Row>
                            <div className={styles.intro}>
                                <div className={styles.introTitle}>
                                    <h3>ELECTRONICS</h3>
                                </div>
                                <div className={styles.content}>
                                    <h3>
                                        <Badge bg="danger">
                                            Amazing Deals on
                                        </Badge>
                                    </h3>
                                    <h3>Tablets & Laptops</h3>
                                </div>
                                <div className={styles.offer}>
                                    <h3>SAVE 70% ON ELECTRONICS</h3>
                                </div>
                                <div className="action">
                                    <button className="buttonPurple px-5 py-2 " onClick={()=>{
                                        navigate("/categories")
                                    }}>Shop Now</button>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={product4} alt="" className="img-fluid" />
                    <Container className={styles.introContent}>
                        <Row>
                            <div className={styles.intro}>
                                <div className={styles.introTitle}>
                                    <h3>WATCHES</h3>
                                </div>
                                <div className={styles.content}>
                                    <h3>
                                        <Badge bg="warning">
                                            Get Stylish Watches
                                        </Badge>
                                    </h3>
                                    <h3>with 15% OFF</h3>
                                </div>
                                <div className={styles.offer}>
                                    <h3>SAVE 5% ON WATCHES</h3>
                                </div>
                                <div className="action">
                                    <button className="buttonPurple px-5 py-2" onClick={()=>{
                                        navigate("/categories")
                                    }}>Shop Now</button>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={product5} alt="" className="w-100" />
                    <Container className={styles.introContent}>
                        <Row>
                            <div className={styles.intro}>
                                <div className={styles.introTitle}>
                                    <h3>MEN'S CLOTHING</h3>
                                </div>
                                <div className={styles.content}>
                                    <h3>
                                        <Badge bg="success">
                                            Get Men's Clothing
                                        </Badge>
                                    </h3>
                                    <h3>Men's Fashion</h3>
                                </div>
                                <div className={styles.offer}>
                                    <h3>SAVE 25% ON MEN'S CLOTHING</h3>
                                </div>
                                <div className="action">
                                    <button className="buttonPurple px-5 py-2" onClick={()=>{
                                        navigate("/categories")
                                    }}>Shop Now</button>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </SwiperSlide>
            </Swiper>
            <CategorySlider />
        </Container>
    );
}
