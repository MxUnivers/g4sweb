import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/layout/AdminLayout';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../../redux/actions/categoryActions';
import AddCategoryModal from '../../../modals/AddCategoryModal';
import EditCategoryModal from '../../../modals/EditCategoryModal';
import DeleteCategoryModal from '../../../modals/DeleteCategoryModal';

// Modales

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  // Filtrer les catégories
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      {/* Titre + Bouton Ajouter */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold">Gestion des catégories</h1>
        <button className="btn btn-danger" onClick={() => setShowAddModal(true)}>
          Ajouter une catégorie
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Message d'erreur global */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tableau */}
      {loading ? (
        <div className="d-flex justify-content-center my-5 py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          {filteredCategories.length === 0 ? (
            <div className="card-body text-center text-muted">
              {searchTerm ? "Aucune catégorie ne correspond à votre recherche" : "Aucune catégorie disponible"}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Date de création</th>
                    <th>Statut</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <small className="text-muted">
                          {category.description?.length > 100
                            ? `${category.description.substring(0, 100)}...`
                            : category.description || '-'}
                        </small>
                      </td>
                      <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${category.access ? 'bg-success' : 'bg-danger'}`}
                        >
                          {category.access ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-dark me-2"
                          onClick={() => openEditModal(category)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => openDeleteModal(category)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modales */}
      <AddCategoryModal show={showAddModal} onHide={() => setShowAddModal(false)} onCreate={createCategory} />

      <EditCategoryModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedCategory(null);
        }}
        onUpdate={updateCategory}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedCategory(null);
        }}
        onDelete={deleteCategory}
        categoryName={selectedCategory?.name}
        categoryId={selectedCategory?._id}
      />
    </AdminLayout>
  );
};

export default CategoryList;