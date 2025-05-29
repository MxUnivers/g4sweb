import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FiShoppingBag, FiGrid, FiArrowRight } from 'react-icons/fi';
import StoreLayout from '../components/layout/StoreLayout';
import { getProducts } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import { addToCart } from '../redux/actions/cartActions';

const Index = () => {
    const dispatch = useDispatch();
    const { featuredProducts, newProducts, loading: productsLoading } = useSelector((state) => state.products);
    const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

    const loading = productsLoading || categoriesLoading;

    // Configuration responsive pour le carrousel
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
            partialVisibilityGutter: 40
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            partialVisibilityGutter: 30
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2,
            partialVisibilityGutter: 20
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 10
        }
    };

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product, 1));
    };


    const heroSlides = [
        {
            image: 'assets/images/barner-ordinateur.jpg',
            title: 'Bienvenue sur votre boutique en ligne',
            description: 'Découvrez notre sélection de produits de qualité à des prix compétitifs. Livraison rapide et service client exceptionnel.',
            cta: 'Voir tous les produits',
            link: '/products',
        },
        {
            image: 'assets/images/casque_VR.png',
            title: 'Offres spéciales',
            description: 'Profitez de nos offres exclusives et promotions limitées.',
            cta: 'En savoir plus',
            link: '/products',
        },
        {
            image: 'assets/images/barner-camera.jpg',
            title: 'Nouveautés de la saison',
            description: 'Explorez les dernières tendances et nouveautés disponibles dès maintenant.',
            cta: 'Découvrir',
            link: '/products',
        },
        
    ];

        
    const responsiveBarner = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 1,
            partialVisibilityGutter: 40
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 1,
            partialVisibilityGutter: 30
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 1,
            partialVisibilityGutter: 20
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 10
        }
    };

    return (
        <StoreLayout>
            {/* Hero Section */}
            <Carousel
                responsive={responsiveBarner}
                            autoPlay={true}
                            infinite={true}
                            showDots={false}
                            containerClass="carousel-container"
            >
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'relative',
                            height: '100vh',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                zIndex: 1,
                            }}
                        />
                        <div
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                color: 'white',
                                textAlign: 'center',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '0 20px',
                            }}
                        >
                            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }} className="text-white">{slide.title}</h1>
                            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }} className="text-white">{slide.description}</p>
                            <Link to={slide.link} className="btn btn-light btn-lg">
                                {slide.cta} <FiArrowRight className="ms-2" />
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>


            {/* Categories Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center h3 mb-4">Nos Catégories</h2>

                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="row g-4">
                                {categories.slice(0, 8).map((category) => (
                                    <div key={category._id} className="col-md-6 col-lg-3">
                                        <Link to={`/category/${category._id}`} className="card shadow-sm border h-100 text-decoration-none">
                                            <div className="card-body d-flex flex-column align-items-center text-center">
                                                <FiGrid className="fs-1 text-danger mb-3" />
                                                <h5 className="card-title">{category.name}</h5>
                                                <p className="card-text text-muted small">
                                                    {category.description || "Découvrez notre sélection"}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {categories.length > 8 && (
                                <div className="text-center mt-4">
                                    <Link to="#" className="btn btn-outline-danger">
                                        Voir toutes les catégories
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Featured Products Carousel */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center h3 mb-4">Produits en vedette</h2>

                    {loading && featuredProducts.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                        </div>
                    ) : (
                        <Carousel
                            responsive={responsive}
                            autoPlay={true}
                            infinite={true}
                            showDots={false}
                            containerClass="carousel-container"
                            itemClass="px-2"
                            dotListClass="custom-dot-list-style"
                        >
                            {featuredProducts.map((product) => (
                                <div key={product._id} className="card h-100 shadow-sm">
                                    <div className="position-relative">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="card-img-top"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="card-img-top d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                                                <FiShoppingBag className="text-muted fs-1" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                                            <h5 className="card-title">{product.name}</h5>
                                        </Link>
                                        <p className="card-text text-muted flex-grow-1" style={{ minHeight: '48px' }}>
                                            {product.description.substring(0, 60)}...
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong className="text-danger">{product.price.toFixed(2)} F</strong>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    )}

                    <div className="text-center mt-4">
                        <Link to="/products" className="btn btn-outline-danger">
                            Voir tous les produits
                        </Link>
                    </div>
                </div>
            </section>

            {/* New Products Carousel */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center h3 mb-4">Nouveaux arrivages</h2>

                    {loading && newProducts.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                        </div>
                    ) : (
                        <Carousel
                            responsive={responsive}
                            autoPlay={true}
                            infinite={true}
                            showDots={false}
                            containerClass="carousel-container"
                            itemClass="px-2"
                        >
                            {newProducts.map((product) => (
                                <div key={product._id} className="card h-100 shadow-sm position-relative">
                                    <div className="position-relative">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="card-img-top"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="card-img-top d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                                                <FiShoppingBag className="text-muted fs-1" />
                                            </div>
                                        )}
                                        <span className="position-absolute top-0 start-0 m-2 badge bg-success">Nouveau</span>
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                                            <h5 className="card-title">{product.name}</h5>
                                        </Link>
                                        <p className="card-text text-muted flex-grow-1" style={{ minHeight: '48px' }}>
                                            {product.description.substring(0, 60)}...
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong className="text-danger">{product.price.toFixed(2)} F</strong>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-5 bg-danger text-white">
                <div className="container text-center">
                    <h2 className="h3 mb-3 text-white">Abonnez-vous à notre newsletter</h2>
                    <p className="mb-4 text-white">
                        Restez informé de nos derniers produits et offres spéciales.
                    </p>
                    <form className="d-flex flex-column flex-md-row gap-2 justify-content-center mb-4">
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            className="form-control w-md-50"
                        />
                        <button type="submit" className="btn btn-light">
                            S'abonner
                        </button>
                    </form>
                </div>
            </section>
        </StoreLayout>
    );
};

export default Index;