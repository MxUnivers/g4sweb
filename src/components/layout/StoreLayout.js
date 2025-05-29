import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import { FiShoppingBag, FiUser, FiLogOut, FiMenu, FiX, FiChevronDown, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { Dropdown } from 'react-bootstrap';

const StoreLayout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {

    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <nav className="container flex items-center justify-between px-4 py-4 mx-auto">
                    {/* Logo */}
                    <div>
                        <img src="images/g4s-logo.png" alt="G4S Logo" className="h-8" />
                    </div>

                    {/* Menu */}
                    <ul className="flex space-x-8 text-gray-700">
                        <li><a href="#about" className="hover:text-red-500">Accueil </a></li>
                        <li><a href="#about" className="hover:text-red-500">A propros </a></li>
                        <li><a href="#contact" className="hover:text-red-500">Contact</a></li>
                    </ul>

                    {/* Search */}
                    <div>
                        <button className="text-gray-600 hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow-1">
                <div className="py-4 container-fluid">{children}</div>
            </main>

            {/* Footer */}
            {/* Footer */}
            <footer className="py-8 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                        {/* Downloads */}
                        <div className="mb-6 md:w-1/3 md:mb-0">
                            <h3 className="mb-4 text-xl font-bold">Downloads</h3>
                            <ul>
                                {/* Liens de téléchargement */}
                            </ul>
                        </div>

                        {/* Popular Pages */}
                        <div className="mb-6 md:w-1/3 md:mb-0">
                            <h3 className="mb-4 text-xl font-bold">Popular pages</h3>
                            <ul>
                                {/* Liens populaires */}
                            </ul>
                        </div>

                        {/* Contacts */}
                        <div className="md:w-1/3">
                            <h3 className="mb-4 text-xl font-bold">Contacts</h3>
                            <address className="text-gray-700">
                                {/* Informations de contact */}
                            </address>
                        </div>
                    </div>

                    {/* Lien de confidentialité et politique */}
                    <div className="flex flex-col items-center justify-between mt-8 md:flex-row">
                        <div>
                            <a href="#" className="text-gray-600 hover:text-gray-800">G4S Privacy Statement</a>
                            <a href="#" className="ml-4 text-gray-600 hover:text-gray-800">Accessibility Statement</a>
                            <a href="#" className="ml-4 text-gray-600 hover:text-gray-800">Cookies Policy</a>
                            <a href="#" className="ml-4 text-gray-600 hover:text-gray-800">Disclaimer</a>
                            <a href="#" className="ml-4 text-gray-600 hover:text-gray-800">Contact us</a>
                        </div>
                        <div className="flex space-x-4">
                            {/* Icônes des réseaux sociaux */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StoreLayout;