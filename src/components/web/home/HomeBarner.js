import React from 'react'
import { Carousel } from "react-bootstrap";

const HomeBarner = () => {

    const slides = [
        {
            bgClass: "bg-image-3-1",
            title: "HOT COLLECTION",
            subtitle: "Spring summer 22 women’s collection",
            description: "Easy & safe payment with PayPal. sequines & embroidered for all",
            img: "assets/images/banner/wvbo-icon.png",
        },
        {
            bgClass: "bg-image-3-3",
            title: "NEW COLLECTION",
            subtitle: "Spring summer 22 women’s collection",
            description: "Easy & safe payment with PayPal. sequines & embroidered for all",
            img: "assets/images/banner/wvbo-icon.png",
        },
        {
            bgClass: "bg-image-3-4",
            title: "WINTER DRESS",
            subtitle: "Spring summer 22 women’s collection",
            description: "Easy & safe payment with PayPal. sequines & embroidered for all",
            img: "assets/images/banner/wvbo-icon.png",
        }
    ];


    return (
        <>

            <div class="banner banner-1 bg-image">
                <div class="container">
                    <div class="banner-inner">
                        <div class="row">
                            <div class="col-xl-2 col-md-4 col-sm-12 gutter-1">
                                <div class="catagory-sidebar">
                                    <div class="widget-bg">
                                        <h2 class="widget-title">All Categories <i class="rt-angle-down"></i></h2>
                                        <nav>
                                            <ul>
                                                <li><a href="shop.html">Activewear <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Bikinis <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Dresses <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Jumpsuits <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Smart Dress <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Sneakers <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Sweetshirts <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Trousers <i class="rt rt-arrow-right-long"></i></a></li>
                                                <li><a href="shop.html">Furniture <i class="rt rt-arrow-right-long"></i></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-10 col-md-8 col-sm-12 gutter-2">
                                <Carousel fade controls={true} indicators={true}>
                                    {slides.map((slide, index) => (
                                        <Carousel.Item key={index}>
                                            <div className={`banner-single bg-image ${slide.bgClass}`}>
                                                <div className="container">
                                                    <div className="single-inner">
                                                        <div className="content-box">
                                                            <p className="slider-subtitle">
                                                                <img src={slide.img} alt="" /> {slide.subtitle}
                                                            </p>
                                                            <h2 className="slider-title">{slide.title} <br /> FOR WOMEN</h2>
                                                            <div className="slider-description">
                                                                <p>{slide.description}</p>
                                                            </div>
                                                            <a href="shop.html" className="slider-btn2">View Collections</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeBarner
