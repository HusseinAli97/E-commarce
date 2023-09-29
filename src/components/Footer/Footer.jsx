import { Container } from 'react-bootstrap'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            {localStorage.getItem("userToken") && (
                <footer className={`${styles.siteFooter}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h6>About Me</h6>
                                <p className="text-justify">
                                    Hello! My Name Is Hussein Ali I'm  a junior front-end developer who recently
                                    graduated from Route Academy, specializing in JavaScript and
                                    CSS. I also have hands-on experience with React.js and
                                    TypeScript, along with proficiency in several other tech
                                    skills. My passion for crafting engaging and user-friendly
                                    web experiences drives me to continuously learn and improve.
                                    I am excited to bring my creativity and technical expertise
                                    to your e-commerce project, ensuring a seamless and visually
                                    appealing online shopping experience for your customers.
                                </p>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <h6>Projects</h6>
                                <ul className={`${styles.footerLinks}`}>
                                    <li>
                                        <a href="https://husseinali97.github.io/LoginSys/" target='_blank'>
                                            LoginSys
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://husseinali97.github.io/Yummy/" target='_blank'>
                                            Yummy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://husseinali97.github.io/CRUD-Sys/" target='_blank'>
                                            CRUD-Sys
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://husseinali97.github.io/DevFolio/" target='_blank'>
                                            DevFolio
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://husseinali97.github.io/hClinc-project-Tut/" target='_blank'>
                                            hClinc-Project
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://husseinali97.github.io/WeatherApp5.5/" target='_blank'>
                                            WeatherApp
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <h6>Quick Links</h6>
                                <ul className={`${styles.footerLinks}`}>
                                    <li>
                                        <Link to="/brands">Brands</Link>
                                    </li>
                                    <li>
                                        <Link to="/categories">Categories</Link>
                                    </li>
                                    <li>
                                        <Link to="/products">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-6 col-xs-12">
                                <p className="copyright-text">
                                    Copyright © 2017 All Rights Reserved by 
                                    <a href="https://www.linkedin.com/in/hm74/" target='_blank' className='textHover text-decoration-none'> HusseinMohamed</a>.
                                </p>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <ul className={`${styles.socialIcons}`}>
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa-brands fa-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa-brands fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dribbble" href="#">
                                            <i className="fa-brands fa-dribbble" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}
