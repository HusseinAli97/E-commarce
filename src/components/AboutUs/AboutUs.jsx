import React from "react";
import styles from "./AboutUs.module.css"; // Import the updated CSS module
import { Container } from "react-bootstrap";
import BgHeader from "../bgHeader/bgHeader";
import { Helmet } from "react-helmet";

export default function AboutUs() {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>About Us</title>
            <meta name="description" content="About Us" />
            <meta name="keywords" content="About Us" />
            <meta name="author" content="Hussein Ali" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href="/about-us" />
        </Helmet>
        <BgHeader mainName="About Us" subName="Us" />
        <Container fluid className={`d-flex align-items-start justify-content-center bg-white vh-100`}>
            <div className={styles["about-container"]}>
                <h2>About Us</h2>
                <p className={styles["about-text"]}>
                    Welcome to our online store! We are dedicated to providing you with the
                    best products and services. Our team works tirelessly to ensure that
                    you have a seamless shopping experience. Feel free to explore our
                    diverse range of products and reach out to us if you have any questions
                    or inquiries.
                </p>
                <div className={styles["contact-info"]}>
                    <p>
                        <i className={styles["info-icon"]} fas fa-map-marker-alt></i> Address: 1234 Elm
                        Street, City, Country
                    </p>
                    <p>
                        <i className={styles["info-icon"]} fas fa-envelope></i> Email:
                        contact@example.com
                    </p>
                    <p>
                        <i className={styles["info-icon"]} fas fa-phone></i> Phone: +1 (123) 456-7890
                    </p>
                </div>
            </div>
        </Container>
    </>
    );
}
