import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../redux/actions/categoryActions';
import { logout } from '../../redux/actions/authActions';
import { FiShoppingBag, FiUser, FiLogOut, FiMenu, FiX, FiChevronDown, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { Dropdown } from 'react-bootstrap';

const StoreLayout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.categories);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <header className="bg-danger position-sticky top-0 text-white shadow-sm" style={{ zIndex: 1000 }}>
                <div className="container py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Logo */}
                        <Link to="/" className="text-white text-decoration-none fs-4 fw-bold">
                            E-Store
                        </Link>

                        {/* Navigation - Desktop */}
                        <nav className="d-none d-md-flex align-items-center gap-4 me-auto">

                            {/* Dropdown Categories */}
                            <div className="position-relative">
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-light" size="sm" className="w-100 text-start">
                                        Catégories <FiChevronDown className="ms-auto" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="w-100">
                                        {categories.map((category) => (
                                            <Dropdown.Item key={category._id} as={Link} to={`/category/${category._id}`}>
                                                {category.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <Link to="/" className="text-white text-decoration-none hover:text-blue-200">Accueil</Link>
                            <Link to="/products" className="text-white text-decoration-none">Tous les produits</Link>
                            <Link to="/about" className="text-white text-decoration-none">A propos</Link>
                            <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
                        </nav>

                        {/* User Menu & Cart */}
                        <div className="d-flex align-items-center gap-3">
                            {/* Cart */}
                            <Link to="/cart" className="position-relative text-white">
                                <FiShoppingBag size={20} />
                                {items.length > 0 && (
                                    <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                                        {items.length}
                                    </span>
                                )}
                            </Link>

                            {/* Authenticated User */}
                            {isAuthenticated ? (
                                <Dropdown align="end">
                                    <Dropdown.Toggle
                                        variant="link"
                                        className="text-white d-flex align-items-center"
                                        id="userDropdown"
                                    >
                                        
                                        <FiUser size={18} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="shadow border-0">
                                        <Dropdown.Item to="#" className="fw-bold">
                                        <span className="d-none d-md-inline me-1">
                                            {user.firstName || user.email}
                                        </span>
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/account">
                                            Mon compte
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/account/orders">
                                            Mes commandes
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            as="button"
                                            onClick={handleLogout}
                                            className="text-danger d-flex align-items-center"
                                        >
                                            <FiLogOut className="me-2" />
                                            Déconnexion
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <div className="d-none d-md-block">
                                    {/* <Link to="/login" className="text-white me-3 text-decoration-none">
                                        Connexion
                                    </Link>
                                    <span className="text-white">|</span>
                                    <Link to="/register" className="ms-3 text-white text-decoration-none">
                                        Inscription
                                    </Link> */}
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                className="d-md-none btn btn-sm btn-outline-light ms-2"
                                onClick={toggleMenu}
                                aria-label="Toggle navigation"
                            >
                                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="mt-3 pb-3 d-md-none">
                            <Link to="/" className="d-block py-2 text-white">Accueil</Link>
                            {/* <div>
                                <button
                                    className="w-100 d-flex justify-content-between align-items-center text-start text-white bg-transparent border-0 p-0 mb-1"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#mobileCategories"
                                >
                                    Catégories <FiChevronDown size={16} />
                                </button>
                                <div className="collapse show ps-3" id="mobileCategories">
                                    {categories.map((category) => (
                                        <Link
                                            key={category._id}
                                            to={`/category/${category._id}`}
                                            className="d-block py-1 text-white text-decoration-none"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div> */}
                            <Link
                                to="/products"
                                className="d-block py-2 text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Tous les produits
                            </Link>
                            <Link
                                to="/categorys"
                                className="d-block py-2 text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                A propos
                            </Link>
                            <Link
                                to="/contact"
                                className="d-block py-2 text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow-1">
                <div className="container-fluid py-4">{children}</div>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-secondary py-5">
                <div className="container">
                    <div className="row g-4">
                        {/* About */}
                        <div className="col-md-6 col-lg-4">
                            <h5 className="text-white mb-3">À propos de nous</h5>
                            <p className="small">
                                E-Store est votre destination pour des achats en ligne fiables et de qualité.
                                Nous proposons un large choix de produits pour tous vos besoins.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-md-6 col-lg-4">
                            <h5 className="text-white mb-3">Liens rapides</h5>
                            <ul className="list-unstyled small">
                                <li><Link to="/" className="text-secondary text-decoration-none">Accueil</Link></li>
                                <li><Link to="/products" className="text-secondary text-decoration-none">Produits</Link></li>
                                <li><Link to="/about" className="text-secondary text-decoration-none">À propos</Link></li>
                                <li><Link to="/contact" className="text-secondary text-decoration-none">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="col-md-6 col-lg-4">
                            <h5 className="text-white mb-3">Catégories</h5>
                            <ul className="list-unstyled small">
                                {categories.slice(0, 5).map((category) => (
                                    <li key={category._id}>
                                        <Link
                                            to={`/category/${category._id}`}
                                            className="text-secondary text-decoration-none"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-md-6 col-lg-4">
                            <h5 className="text-white mb-3">Contact</h5>
                            <ul className="list-unstyled small">
                                <li className="d-flex align-items-center mb-2">
                                    <FiMapPin size={16} className="me-2" />
                                    <span>123 Rue du Commerce, 75000 Paris</span>
                                </li>
                                <li className="d-flex align-items-center mb-2">
                                    <FiPhone size={16} className="me-2" />
                                    <span>+33 1 23 45 67 89</span>
                                </li>
                                <li className="d-flex align-items-center mb-2">
                                    <FiMail size={16} className="me-2" />
                                    <span>contact@estore.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-4 text-secondary" />

                    <div className="text-center">
                        <p className="mb-0 small text-muted">
                            &copy; {new Date().getFullYear()} E-Store. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StoreLayout;