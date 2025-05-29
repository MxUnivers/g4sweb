import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HomeBrands = () => {
    // Configuration responsive du carrousel
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
        desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 2 }
    };

    // Liste des marques
    const brands = [
        "assets/images/brands/client-01.png",
        "assets/images/brands/client-02.png",
        "assets/images/brands/client-03.png",
        "assets/images/brands/client-04.png",
        "assets/images/brands/client-05.png",
        "assets/images/brands/client-06.png"
    ];

    return (
        <div className="rts-brands-section1 brand-bg3">
            <div className="container">
                <Carousel 
                    responsive={responsive} 
                    autoPlay={true} 
                    infinite={true} 
                    arrows={false} 
                    showDots={false} 
                    autoPlaySpeed={2000} 
                >
                    {brands.map((brand, index) => (
                        <div key={index} className="brand-slide">
                            <a className="brand-front" href="#">
                                <img src={brand} alt={`Brand ${index + 1}`} />
                            </a>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default HomeBrands;
