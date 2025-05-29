import React from "react";


const HomeFeatureProduct = () => {

    const featuredProducts = [
        {
            id: 1,
            name: "Manteau en Laine",
            images: [
                "https://img.freepik.com/psd-gratuit/manteau-laine-mode-isole-fond-transparent_191095-17703.jpg?w=900",
                "https://img.freepik.com/psd-gratuit/manteau-laine-femme-marron_191095-17705.jpg?w=900"
            ],
            price: "$120.00",
            rating: 5,
            tags: ["NEW"]
        },
        {
            id: 2,
            name: "Veste Homme Marron",
            images: [
                "https://img.freepik.com/psd-gratuit/veste-homme-marron-fond-transparent_191095-18203.jpg?w=900",
                "https://img.freepik.com/psd-gratuit/veste-cuir-homme_191095-18194.jpg?w=900"
            ],
            price: "$89.99",
            rating: 4,
            tags: ["HOT", "-15%"]
        },
        {
            id: 3,
            name: "Blouson Moto Cuir",
            images: [
                "https://img.freepik.com/psd-gratuit/blouson-moto-cuir-isole-fond-transparent_191095-17754.jpg?w=900",
                "https://img.freepik.com/psd-gratuit/blouson-cuir-style-moto_191095-17750.jpg?w=900"
            ],
            price: "$150.00",
            rating: 4.5,
            tags: ["LIMITED"]
        },
        {
            id: 4,
            name: "Sweatshirt à Capuche",
            images: [
                "https://img.freepik.com/psd-gratuit/sweatshirt-noir-capuche-homme_191095-17816.jpg?w=900",
                "https://img.freepik.com/psd-gratuit/sweatshirt-rouge-capuche-homme_191095-17818.jpg?w=900"
            ],
            price: "$45.00",
            rating: 3.5,
            tags: ["-20%"]
        }
    ];

    
    return (
        <div className="rts-featured-product-section1">
            <div className="container">
                <div className="rts-featured-product-section-inner">
                    <div className="section-header section-header3 text-center">
                        <div className="wrapper">
                            <div className="sub-content">
                                <img className="line-1" src="assets/images/banner/wvbo-icon.png" alt="" />
                                <span className="sub-text">Featured</span>
                                <img className="line-2" src="assets/images/banner/wvbo-icon.png" alt="" />
                            </div>
                            <h2 className="title">FEATURED PRODUCTS</h2>
                        </div>
                    </div>

                    <div className="row">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="col-xl-3 col-md-4 col-sm-6 col-12">
                                <div className="product-item element-item1">
                                    <a href="product-details.html" className="product-image image-hover-variations">
                                        <div className="image-vari1 image-vari">
                                            <img src={product.images[0]} alt="product-image" />
                                        </div>
                                        <div className="image-vari2 image-vari">
                                            <img src={product.images[1]} alt="product-image" />
                                        </div>
                                    </a>

                                    <div className="bottom-content">
                                        <div className="star-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fas fa-star${i < product.rating ? "" : "-half-alt"}`}></i>
                                            ))}
                                        </div>
                                        <a href="product-details.html" className="product-name">{product.name}</a>
                                        <div className="action-wrap">
                                            <span className="price">{product.price}</span>
                                        </div>
                                    </div>

                                    <div className="quick-action-button">
                                        <div className="cta-single cta-plus">
                                            <a href="#"><i className="rt-plus"></i></a>
                                        </div>
                                        <div className="cta-single cta-quickview">
                                            <button className="product-details-popup-btn"><i className="far fa-eye"></i></button>
                                        </div>
                                        <div className="cta-single cta-wishlist">
                                            <a href="wishlist.html"><i className="far fa-heart"></i></a>
                                        </div>
                                        <div className="cta-single cta-addtocart">
                                            <a href="cart.html"><i className="rt-basket-shopping"></i></a>
                                        </div>
                                    </div>

                                    {product.tags.length > 0 && (
                                        <div className="product-features">
                                            {product.tags.map((tag, index) => (
                                                <div key={index} className="product-tag">{tag}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomeFeatureProduct;
