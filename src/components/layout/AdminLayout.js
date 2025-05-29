import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import { FiHome, FiUsers, FiLogOut } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  // Vérifie si le lien est actif
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h5 className="text-lg font-bold text-gray-800">E-Commerce Admin</h5>
        </div>

        {/* Navigation */}
        <nav className="flex-grow overflow-y-auto p-3">
          <ul className="space-y-2">
            {/* Tableau de bord */}
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/dashboard') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiHome size={18} className="mr-2" /> Tableau de bord
              </Link>
            </li>

            {/* Contacts */}
            <li>
              <Link
                to="/admin/contacts"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/contacts') ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiUsers size={18} className="mr-2" /> Contacts
              </Link>
            </li>
          </ul>
        </nav>

        {/* Déconnexion */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-200 rounded-md"
          >
            <FiLogOut size={18} className="mr-2" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto py-3 px-4 flex justify-between items-center">
            <h6 className="text-lg font-semibold text-gray-800">Panneau d'administration</h6>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Admin</span>
              <div className="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-auto bg-gray-100 p-4">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>

      {/* Modal de déconnexion */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Confirmer la déconnexion</h3>
            <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;