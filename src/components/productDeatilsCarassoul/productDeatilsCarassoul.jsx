import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Slider from "react-slick";
import styles from './productDeatilsCarassoul.module.css'
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
} from "react-image-magnifiers";

export default class AsNavFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        const { images } = this.props;
        return (
            <div>
                <Row>
                    <Col md={3} className="d-none d-lg-flex flex-column align-items-center justify-content-center p-0" >
                        <div className="content ">
                            <Slider
                                asNavFor={this.state.nav1}
                                ref={slider => (this.slider2 = slider)}
                                slidesToShow={3}
                                focusOnSelect={true}
                                arrows={false}
                                vertical={true}
                                className={`${styles.slider} `}
                                verticalSwiping={true}
                                draggable={true}
                            >
                                {images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt="" className="w-100 scale-1" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                    <Col md={9} className="p-0">
                        <Slider
                            asNavFor={this.state.nav2}
                            ref={slider => (this.slider1 = slider)}
                            slidesToShow={1}
                            infinite={true}
                            arrows={false}
                            autoplay={true}
                            autoplaySpeed={4000}
                            className={`${styles.sliderMain}`}
                        >
                            {images.map((image, index) => (
                                <div key={index}>
                                    <SideBySideMagnifier
                                        imageSrc={image}
                                        imageAlt="Example"
                                        className="w-100 "
                                        alwaysInPlace={true}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </Col>
                </Row>
            </div>
        );
    }
}