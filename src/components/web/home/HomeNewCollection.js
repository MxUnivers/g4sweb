import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HomeNewCollection = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const items = [
        { img: "assets/images/catagory/item-1.png", title: "FOR WOMEN'S", quantity: 20 },
        { img: "assets/images/catagory/item-2.png", title: "FOR MEN'S", quantity: 33 },
        { img: "assets/images/catagory/item-3.png", title: "FOR KIDS", quantity: 25 },
        { img: "assets/images/catagory/item-4.png", title: "ACCESSORIES", quantity: 33 },
    ];

    return (
        <div className="rts-new-collection-section section-gap">
            <div className="container">
                <div className="recent-products-header section-header">
                    <h2>New Collection</h2>
                </div>
                <Carousel 
                    responsive={responsive} 
                    autoPlay={true} 
                    infinite={true} 
                    arrows={true} 
                    showDots={true} 
                >
                    {items.map((item, index) => (
                        <div key={index} className="collection-item p-4">
                            <a href="category.html">
                                <img src={item.img} alt="collection-image" />
                            </a>
                            <p className="item-quantity">{item.quantity} <span>items</span></p>
                            <a href="category.html" className="item-catagory-box">
                                <h3 className="title">{item.title}</h3>
                            </a>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default HomeNewCollection;
