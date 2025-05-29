import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/layout/AdminLayout';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../../redux/actions/productActions';
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'sonner';
import { handleImageUploadCloud } from '../../../actions/upload/UploadCloud';
import { getCategories } from '../../../redux/actions/categoryActions';
import AddProductModal from '../../../modals/AddProductModal';
import EditProductModal from '../../../modals/EditProductModal';
import DeleteProductModal from '../../../modals/DeleteProductModal';
import { MdImage } from 'react-icons/md';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      toast.warn('Veuillez remplir tous les champs');
      return;
    }

    const uploadedUrls = await handleImageUploadCloud(images, toast);
    if (!uploadedUrls || uploadedUrls.includes(null)) {
      toast.error("Erreur lors de l'upload des images");
      return;
    }

    try {
      await dispatch(createProduct({ ...newProduct, images: uploadedUrls }));
      setShowAddModal(false);
      setNewProduct({ name: '', description: '', price: '', stock: '', category: '' });
      setImages([]);
    } catch (err) {
      console.error('Erreur lors de la création:', err);
      toast.error("Erreur lors de la création du produit");
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      category: product.category?._id || product.category || ''
    });
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
      setShowEditModal(false);
      setSelectedProduct(null);
      setNewProduct({ name: '', description: '', price: '', stock: '', category: '' });
      setImages([]);
    
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteProduct(selectedProduct._id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      toast.error("Erreur lors de la suppression du produit");
    }
  };

  return (
    <AdminLayout>
      {/* Titre + Bouton Ajouter */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold">Gestion des Produits</h1>
        <button className="btn btn-danger" onClick={() => setShowAddModal(true)}>
          <FiPlus size={18} className="me-2" /> Ajouter un produit
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredProducts.length === 0 ? (
            <div className="card-body text-center text-muted">
              {searchTerm ? "Aucun produit ne correspond à votre recherche" : "Aucun produit disponible"}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 table-responsive table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Images</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix (F)</th>
                    <th>Stock</th>
                    <th>Catégorie</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product?.images && product?.images.length > 0 ? <img src={product?.images[0]||""} className="img-fluid rounded-lg" style={{height:"60px", width:"60px"}}/>:<MdImage/>}</td>
                      <td>{product.name}</td>
                      <td><small className="text-muted">{product.description.substring(0, 60)}...</small></td>
                      <td>{product.price.toFixed(2)} </td>
                      <td>
                        <span className={`badge ${product.stock <= 10 ? 'bg-warning text-dark' : 'bg-success'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>{product.category?.name || 'Non catégorisé'}</td>
                      <td className="text-end">
                        <button
                        type="button"
                          className="btn btn-sm btn-outline-dark me-2"
                          onClick={() => handleEdit(product)}
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <FiTrash2 size={16} />
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
      <AddProductModal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          setNewProduct({ name: '', description: '', price: '', stock: '', category: '' });
          setImages([]);
        }}
        onSubmit={handleSubmit}
        newProduct={newProduct}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        categories={categories}
      />

      <EditProductModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedProduct({ name: '', description: '', price: '', stock: '', category: '', images:[] });
          setNewProduct({ name: '', description: '', price: '', stock: '', category: '', images:[] });
          setImages([]);
        }}
        onUpdate={handleUpdate}
        product={selectedProduct}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        categories={categories}
      />

      <DeleteProductModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onDelete={confirmDelete}
        productName={selectedProduct?.name}
      />
    </AdminLayout>
  );
};

export default ProductList;