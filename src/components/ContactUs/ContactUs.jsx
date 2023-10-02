import React, { useState } from "react";
import styles from "./ContactUs.module.css"; // Import the updated CSS module
import { Container } from "react-bootstrap";
import BgHeader from "../bgHeader/bgHeader";
import { Helmet } from "react-helmet";


export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., sending data to a server)
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Contact Us</title>
                <meta name="description" content="Contact Us" />
                <meta name="keywords" content="Contact Us" />
                <meta name="author" content="Hussein Ali" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="/contact-us" />
            </Helmet>
            <BgHeader mainName="Contact" subName="Us" />
            <Container fluid className={`d-flex align-items-start justify-content-center bg-white`}>
                <div className={styles["contact-container"]}>
                    <h2>Contact Us</h2>
                    <form className={styles["contact-form"]} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className={styles["form-input"]}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className={styles["form-input"]}
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            className={styles["form-textarea"]}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className={styles["submit-button"]}>
                            Submit
                        </button>
                    </form>
                </div>
            </Container>
        </>
    );
}
