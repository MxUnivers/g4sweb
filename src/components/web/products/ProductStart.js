import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Offcanvas, Row } from 'react-bootstrap';
import SideBarFilterProduct from '../SideBarFilterProduct';
import { MdFilterList } from "react-icons/md";
import ProductCard from '../../../containers/products/ProductCard';

const ProductStart = () => {
    const products = [
        {
            id: 1,
            name: "Men’s Canvas",
            image: "assets/images/hand-picked/slider-img8_2.jpg",
            price: "$310.00",
            detailsLink: "product-details.html",
            cartLink: "cart.html",
            wishlistLink: "wishlist.html",
        },
        {
            id: 2,
            name: "Woman’s Blouse",
            images: [
                "assets/images/hand-picked/woman-shirt-338x450.png",
                "assets/images/hand-picked/woman-shirt-2.jpg",
            ],
            price: "$220.00",
            detailsLink: "product-details.html",
            cartLink: "cart.html",
            wishlistLink: "wishlist.html",
            tags: ["NEW", "-35%"]
        },
        {
            id: 3,
            name: "Legacy Leather Sneaker",
            image: "assets/images/hand-picked/slider-img14.webp",
            price: "$270.00",
            detailsLink: "product-details.html",
            cartLink: "cart.html",
            wishlistLink: "wishlist.html",
        },
        {
            id: 4,
            name: "Chloe by Karl Lagerfeld",
            image: "assets/images/hand-picked/slider-img12-1.webp",
            price: "$225.00",
            detailsLink: "product-details.html",
            cartLink: "cart.html",
            wishlistLink: "wishlist.html",
            tags: ["NEW", "HOT"]
        },
        {
            id: 5,
            name: "Minimalist Beard Mug",
            image: "assets/images/hand-picked/slider-img12-3.webp",
            price: "$210.00",
            detailsLink: "product-details.html",
            cartLink: "cart.html",
            wishlistLink: "wishlist.html",
        },
        {
            id: 6,
            name: "Minimalist Beard Mug",
            image: "assets/images/hand-picked/slider-img12.webp",
            price: "$210.00",
            detailsLink: "product-details.html",
            cartLink: "cart.html",
            wishlistLink: "wishlist.html",
        }
    ];


    const [show, setShow] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fonction pour détecter la taille d'écran et mettre à jour `isMobile`
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    // Ajouter un écouteur d'événement lors du montage
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(12);

    // Pagination dynamique
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);





    return (
        <div class="rts-shop-section">
            <div class="container">
                <Row>
                    <Col xl={isMobile ? 12 : 9} >
                        <div class="shop-product-topbar">
                            <span class="items-onlist">Resultats (1/10)</span>x
                            <div class="filter-area">
                                {/* Bouton pour ouvrir le Canvas */}
                                {
                                    isMobile && (
                                        <Button variant="dark" size='sm' onClick={handleShow}>
                                            <MdFilterList /> Filtres & Catégories
                                        </Button>
                                    )
                                }

                                <p class="select-area">
                                    <select class="select" onChange={(e) => { setproductsPerPage(e.target.value) }}>
                                        <option value={12}>12</option>
                                        <option value={30}>30</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div class="products-area products-area3">
                            <div className="row justify-content-center">
                                {products.length > 0 ? (products.map((product) => (
                                    <ProductCard product={product} />
                                )))
                                    : (
                                        <Alert variant="warning" className="text-center">
                                            Aucun produit disponible
                                        </Alert>
                                    )
                                }
                            </div>
                        </div>
                        {/* Pagination dynamique */}
                        {products.length > 0 && (
                            <div className="product-pagination-area mt-20">
                                <button className="prev" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                    <i className="far fa-long-arrow-left"></i>
                                </button>

                                {pages.map((page, index) => (
                                    <button
                                        key={index}
                                        className={`number ${currentPage === page ? "active" : ""}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button className="next" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                    <i className="far fa-long-arrow-right"></i>
                                </button>
                            </div>
                        )}
                    </Col>
                    {
                        !isMobile && (
                            <Col xl={3}>
                                <SideBarFilterProduct />
                            </Col>
                        )
                    }



                    {/*Canvas */}



                    {/* Offcanvas React-Bootstrap */}
                    <Offcanvas show={show} onHide={handleClose} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Filtres & Catégories</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <SideBarFilterProduct />
                        </Offcanvas.Body>
                    </Offcanvas>
                </Row>
            </div>
        </div >
    )
}

export default ProductStart
