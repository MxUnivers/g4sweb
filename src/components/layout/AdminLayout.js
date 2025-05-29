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
      <aside className="flex flex-col w-64 bg-white shadow-md">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h5 className="text-lg font-bold text-gray-800">Admin</h5>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-3 overflow-y-auto">
          <ul className="space-y-2">
            {/* Tableau de bord */}
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/dashboard') ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-200'
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
                  isActive('/admin/contacts') ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-200'
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
            className="flex items-center w-full px-4 py-2 text-red-600 rounded-md hover:bg-gray-200"
          >
            <FiLogOut size={18} className="mr-2" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="container flex items-center justify-between px-4 py-3 mx-auto">
            <h6 className="text-lg font-semibold text-gray-800">Panneau d'administration</h6>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">Admin</span>
              <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-red-500 rounded-full">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 overflow-auto bg-gray-100">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>

      {/* Modal de déconnexion */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-gray-800">Confirmer la déconnexion</h3>
            <p className="mb-6 text-gray-600">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
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