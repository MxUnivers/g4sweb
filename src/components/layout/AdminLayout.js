import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import {
  FiHome,
  FiGrid,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiCreditCard,
  FiMapPin,
  FiLogOut,
  FiExternalLink
} from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  // Fonction pour vérifier si le lien est actif
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="bg-white text-dark d-flex flex-column" style={{ width: '250px' }}>
        <div className="p-4 border-bottom border-secondary">
          <h5 className="fw-bold mb-0">E-Commerce Admin</h5>
        </div>

        <nav className="flex-grow-1 overflow-auto p-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to="/admin/dashboard"
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/dashboard') ? 'bg-primary text-dark' : 'text-dark'}`}
              >
                <FiHome size={18} className="me-2" /> Tableau de bord
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/categories"
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/categories') ? 'bg-primary text-dark' : 'text-dark'}`}
              >
                <FiGrid size={18} className="me-2" /> Catégories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/products"
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/products') ? 'bg-primary text-dark' : 'text-dark'}`}
              >
                <FiBox size={18} className="me-2" /> Produits
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/orders"
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/orders') ? 'bg-primary text-dark' : 'text-dark'}`}
              >
                <FiShoppingBag size={18} className="me-2" /> Commandes
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/admin/customers"
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/customers') ? 'bg-primary text-dark' : 'text-dark'}`}
              >
                <FiUsers size={18} className="me-2" /> Clients
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/transactions"
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/transactions') ? 'bg-primary text-dark' : 'text-dark'}`}
              >
                <FiCreditCard size={18} className="me-2" /> Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/postal-codes"
                className={`nav-link px-3 py-2 rounded ${isActive('/admin/postal-codes') ? 'bg-primary text-dark' : 'text-dark'}`}
              >
                <FiMapPin size={18} className="me-2" /> Codes Postaux
              </Link>
            </li> */}
            <li className="nav-item mt-3 pt-3 border-top border-secondary">
              <Link to="/" className="nav-link px-3 py-2 text-dark">
                <FiExternalLink size={18} className="me-2" /> Voir le site
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-3 border-top border-secondary">
          <button onClick={handleLogout} className="btn btn-outline-light w-100 d-flex align-items-center">
            <FiLogOut size={18} className="me-2" /> Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm sticky-top">
          <div className="container-fluid py-3 px-4 d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-semibold">Panneau d'administration</h6>
            <div className="d-flex align-items-center">
              <span className="small text-muted me-2">Admin</span>
              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-dark" style={{ width: '30px', height: '30px' }}>
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1 overflow-auto bg-light p-4">
          <div className="container-fluid">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;