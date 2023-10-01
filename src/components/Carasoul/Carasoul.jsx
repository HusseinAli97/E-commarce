import styles from './Carasoul.module.css'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../images/bgForm.jpg'
export default function CarasoulProduct() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <></>
        // <Carousel activeIndex={index} onSelect={handleSelect} slide={true} indicators={false} interval={3000} controls={false}>
        //     <Carousel.Item>
        //         <img src={ExampleCarouselImage} className='w-100' alt="" />
        //         <Carousel.Caption>
        //             <h3>First slide label</h3>
        //             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        //     <Carousel.Item>
        //     <img src={ExampleCarouselImage} className='w-100' alt="" />
        //         <Carousel.Caption>
        //             <h3>Second slide label</h3>
        //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        //     <Carousel.Item>
        //     <img src={ExampleCarouselImage} className='w-100' alt="" />
        //         <Carousel.Caption>
        //             <h3>Third slide label</h3>
        //             <p>
        //                 Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        //             </p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        // </Carousel>
    )
}
