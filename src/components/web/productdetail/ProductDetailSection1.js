import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import des styles
import { ROUTES } from '../../../config/routing';
import { Link } from 'react-router-dom';

const ProductDetailSection1 = () => {
    // ✅ Stockage des détails du produit dans un state
    const [productDetail, setProductDetail] = useState({
        category: "Dress",
        name: "Wide Cotton Tunic Dress",
        stockStatus: "In Stock",
        oldPrice: "$9.35",
        price: "$7.25",
        description: "Priyoshop has brought to you the Hijab 3 Pieces Combo Pack PS23. It is a completely modern design and you feel comfortable to put on this hijab. Buy it at the best price.",
        sku: "BO1D0MX8SJ",
        categories: ["T-Shirts", "Tops", "Mens"],
        tags: ["fashion", "t-shirts", "Men"],
        images: [
            {
                original: "https://img.freepik.com/psd-gratuit/manteau-laine-mode-isole-fond-transparent_191095-17703.jpg?w=900",
                thumbnail: "https://img.freepik.com/psd-gratuit/manteau-laine-mode-isole-fond-transparent_191095-17703.jpg?w=100",
            },
            {
                original: "https://img.freepik.com/psd-gratuit/veste-homme-marron-fond-transparent_191095-18203.jpg?w=900",
                thumbnail: "https://img.freepik.com/psd-gratuit/veste-homme-marron-fond-transparent_191095-18203.jpg?w=100",
            },
            {
                original: "https://img.freepik.com/psd-gratuit/blouson-moto-cuir-isole-fond-transparent_191095-17754.jpg?w=900",
                thumbnail: "https://img.freepik.com/psd-gratuit/blouson-moto-cuir-isole-fond-transparent_191095-17754.jpg?w=100",
            }
        ],
        reviews: 10, // Nombre de reviews
        rating: 4.5 // Note moyenne
    });

    return (
        <div className="rts-product-details-section section-gap">
            <div className="container">
                <div className="details-product-area mb--70">
                    {/* 📸 Galerie d'images */}
                    <div className="product-thumb-area">
                        <div className="product-gallery">
                            <ImageGallery
                                items={productDetail.images}
                                showPlayButton={false}
                                showFullscreenButton={true}
                                slideInterval={9000} // Défilement toutes les 9 secondes
                                autoPlay={true} // Défilement automatique
                            />
                        </div>
                    </div>

                    {/* 🛒 Détails du produit */}
                    <div className="contents">
                        <div className="product-status">
                            <span className="product-catagory">{productDetail.category}</span>
                            <div className="rating-stars-group">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`fas fa-star${i < productDetail.rating ? "" : "-half-alt"}`}></i>
                                ))}
                                <span>{productDetail.reviews} Reviews</span>
                            </div>
                        </div>

                        <h2 className="product-title">
                            {productDetail.name} <span className="stock">{productDetail.stockStatus}</span>
                        </h2>
                        <span className="product-price">
                            <span className="old-price">{productDetail.oldPrice}</span> {productDetail.price}
                        </span>
                        <p>{productDetail.description}</p>

                        {/* ✅ Actions sur le produit */}
                        <div className="product-bottom-action">
                            <div className="cart-edit">
                                <div className="quantity-edit action-item">
                                    <button className="button"><i className="fal fa-minus minus"></i></button>
                                    <input type="text" className="input" defaultValue="01" />
                                    <button className="button plus"><i className="fal fa-plus plus"></i></button>
                                </div>
                            </div>
                            <Link to={`/${ROUTES.BASKET}`} className="addto-cart-btn action-item">
                                <i className="rt-basket-shopping"></i> Ajouter au panier
                            </Link>
                            <a href="wishlist.html" className="wishlist-btn action-item">
                                <i className="rt-heart"></i>
                            </a>
                        </div>

                        {/* ✅ Informations complémentaires */}
                        <div className="product-uniques">
                            <span className="sku product-unipue"><span>SKU: </span> {productDetail.sku}</span>
                            <span className="catagorys product-unipue">
                                <span>Categories: </span> {productDetail.categories.join(", ")}
                            </span>
                            <span className="tags product-unipue">
                                <span>Tags: </span> {productDetail.tags.join(", ")}
                            </span>
                        </div>

                        {/* ✅ Partage sur les réseaux sociaux */}
                        <div className="share-social">
                            <span>Share:</span>
                            <a className="platform" href="http://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
                            <a className="platform" href="http://twitter.com" target="_blank"><i className="fab fa-twitter"></i></a>
                            <a className="platform" href="http://behance.com" target="_blank"><i className="fab fa-behance"></i></a>
                            <a className="platform" href="http://youtube.com" target="_blank"><i className="fab fa-youtube"></i></a>
                            <a className="platform" href="http://linkedin.com" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

                {/* ✅ Section "Description" et "Reviews" */}
                <div className="product-full-details-area">
                    <Tabs defaultActiveKey="description" id="product-tabs" className="mb-3">
                        {/* ✅ Onglet Description */}
                        <Tab eventKey="description" title="Description">
                            <div className="full-details">
                                <p className="mb--30">
                                    In marketing, a product is an object or system made available for consumer use.
                                    It is anything that can be offered to a market to satisfy the desire or need of a customer.
                                </p>
                                <p>
                                    A product can be classified as tangible or intangible.
                                    A tangible product is a physical object that can be perceived by touch such as a building, vehicle, gadget, or clothing.
                                </p>
                            </div>
                        </Tab>

                        {/* ✅ Onglet Additional Information */}
                        <Tab eventKey="additional-info" title="Additional Information">
                            <div className="full-details">
                                <p>
                                    This product is made with high-quality materials and is designed to provide the best experience for users.
                                </p>
                                <ul>
                                    <li>✔ High-Quality Material</li>
                                    <li>✔ 100% Satisfaction Guarantee</li>
                                    <li>✔ Available in Multiple Colors</li>
                                </ul>
                            </div>
                        </Tab>

                        {/* ✅ Onglet Reviews */}
                        <Tab eventKey="reviews" title={`Reviews (${productDetail.reviews})`}>
                            <div className="full-details">
                                {productDetail.reviews > 0 ? (
                                    <p>Customer reviews will be displayed here...</p>
                                ) : (
                                    <p>No reviews yet. Be the first to review this product!</p>
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailSection1;
