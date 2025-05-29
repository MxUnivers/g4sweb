import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import {
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMapPin,
} from "react-icons/fi";

const StoreLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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

          {/* Menu (Visible sur desktop) */}
          <ul className="hidden space-x-8 text-gray-700 md:flex">
            <li>
              <Link to="/" className="hover:text-red-500">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-500">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500">
                Contact
              </Link>
            </li>
          </ul>

          {/* Search */}
          <div className="hidden md:block">
            <button className="text-gray-600 hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-gray-600 md:hidden hover:text-red-500"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <FiX size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </nav>

        {/* Sidebar (Visible uniquement sur mobile) */}
        <aside
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 md:hidden`}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Header */}
            <div className="p-4 border-b">
              <img src="images/g4s-logo.png" alt="G4S Logo" className="h-8" />
            </div>

            {/* Links */}
            <ul className="flex flex-col p-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="flex items-center text-gray-700 hover:text-red-500"
                  onClick={toggleMenu}
                >
                  <FiShoppingBag size={20} className="mr-2" /> Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center text-gray-700 hover:text-red-500"
                  onClick={toggleMenu}
                >
                  <FiUser size={20} className="mr-2" /> À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center text-gray-700 hover:text-red-500"
                  onClick={toggleMenu}
                >
                  <FiMail size={20} className="mr-2" /> Contact
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <button
                    className="flex items-center text-gray-700 hover:text-red-500"
                    onClick={handleLogout}
                  >
                    <FiLogOut size={20} className="mr-2" /> Déconnexion
                  </button>
                </li>
              )}
            </ul>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-red-500">
                  <FiFacebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-500">
                  <FiInstagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-500">
                  <FiTwitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </header>

      {/* Main Content */}
      
   <main className="flex-grow-1">
                <div className="py-4 container-fluid">{children}</div>
            </main>

      {/* Footer */}
      <footer className="py-8 text-white bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* About Section */}
            <div>
              <h3 className="mb-4 text-lg font-bold">À propos de nous</h3>
              <p className="text-gray-400">
                G4S est un leader mondial dans les solutions de sécurité intégrées. Nous combinons expertise, technologie et innovation pour répondre aux besoins de nos clients.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Liens rapides</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-500">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Politique de confidentialité
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Contactez-nous</h3>
              <div className="space-y-2 text-gray-400">
                <p>
                  <FiPhone size={16} className="inline mr-2" />
                  +212 600 00 00 00
                </p>
                <p>
                  <FiMail size={16} className="inline mr-2" />
                  contact@g4s.com
                </p>
                <p>
                  <FiMapPin size={16} className="inline mr-2" />
                  Adresse, Ville, Pays
                </p>
              </div>
            </div>
          </div>

          {/* Social Media and Copyright */}
          <div className="flex flex-col items-center justify-between mt-8 md:flex-row">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500">
                <FiTwitter size={20} />
              </a>
            </div>
            <p className="mt-4 text-gray-400 md:mt-0">
              &copy; {new Date().getFullYear()} G4S. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;

