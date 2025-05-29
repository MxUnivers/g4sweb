import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Composants Bootstrap
import { Carousel, Button, Form } from 'react-bootstrap';
import StoreLayout from '../../components/layout/StoreLayout';
import { getProductById, getProducts } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { currentProduct, products, loading, error: productError } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { items: cartItems } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Récupérer le produit
  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
      dispatch(getProducts());
    }
  }, [dispatch]);

  // Trouver les produits similaires
  useEffect(() => {
    if (currentProduct && currentProduct.category) {
      const related = products.filter(

        (p) =>
          (p.category === currentProduct.category || p.category?._id === currentProduct.category?._id) &&
          p._id !== currentProduct._id
      );
      setRelatedProducts(related.slice(0, 8));
    }
  }, [currentProduct, products]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    dispatch(addToCart(currentProduct, quantity));

    setTimeout(() => {
      setIsAddingToCart(false);
      setShowToast(true);
    }, 500);
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));

  const category = categories.find(
    (cat) => cat._id === currentProduct?.category?._id || cat._id === currentProduct?.category
  );

  if (loading) {
    return (
      <StoreLayout>
        <div className="d-flex justify-content-center my-5 py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </StoreLayout>
    );
  }

  if (!currentProduct && !loading && productError) {
    return (
      <StoreLayout>
        <div className="container py-5">
          <div className="alert alert-danger text-center">
            {productError || 'Produit introuvable'}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-outline-primary">
              ← Retour aux produits
            </Link>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">Produits</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {currentProduct?.name}
            </li>
          </ol>
        </nav>

        {/* Fiche produit */}
        <div className="row g-4">
          {/* Galerie d'images */}
          <div className="col-md-6">
            {currentProduct?.images && currentProduct.images.length > 0 ? (
              <Carousel variant="dark" indicators={true} controls={true}>
                {currentProduct.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={img}
                      alt={`${currentProduct.name} - Image ${index + 1}`}
                      className="d-block w-100"
                      style={{ height: '400px', objectFit: 'contain' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div className="bg-light border rounded p-5 text-center">
                <p>Aucune image disponible pour ce produit.</p>
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="col-md-6">
            <h2 className="mb-3">{currentProduct?.name}</h2>
            <p className="text-muted mb-1">
              Catégorie : <strong>{category?.name || 'Inconnue'}</strong>
            </p>
            <h4 className="text-danger mb-4">{ currentProduct && currentProduct?.price ? currentProduct?.price.toFixed(2):0} F</h4>
            <p className="mb-4">{currentProduct?.description || 'Aucune description.'}</p>

            {/* Quantité */}
            <div className="d-flex align-items-center mb-4">
              <label className="me-3">Quantité :</label>
              <div className="input-group w-auto" style={{ maxWidth: '120px' }}>
                <button className="btn btn-outline-secondary" onClick={decreaseQty}>
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={quantity}
                  readOnly
                  style={{ width: '60px' }}
                />
                <button className="btn btn-outline-secondary" onClick={increaseQty}>
                  +
                </button>
              </div>
            </div>

            {/* Bouton ajout au panier */}
            <Button
              size="lg"
              variant="danger"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-100 ${isAddingToCart ? 'disabled' : ''}`}
            >
              {isAddingToCart ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" /> Ajout...
                </>
              ) : (
                <>
                  <i className="bi bi-cart me-2"></i> Ajouter au panier
                </>
              )}
            </Button>
          </div>
        </div>

        
        {/* Description complète */}
        <div className="mt-5 bg-light p-4 rounded">
          <h5>Description complète</h5>
          <p className="mt-2">{currentProduct?.description || 'Aucune description disponible.'}</p>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-3">Autres produits de cette catégorie</h4>
            <div className="row g-4">
              {relatedProducts.map((prod) => (
                <div key={prod._id} className="col-md-3">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={prod.images?.[0] || '/default-product.jpg'}
                      alt={prod.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{prod.name}</h6>
                      <p className="card-text text-danger">{prod && prod?.price ? prod?.price.toFixed(2):0} F</p>
                      <Link
                        to={`/product/${prod._id}`}
                        className="btn btn-sm btn-outline-danger mt-auto"
                      >
                        Voir ce produit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Toast feedback */}
        {showToast && (
          <div className="position-fixed bottom-0 end-0 m-3 p-3" style={{ zIndex: 9999 }}>
            <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>{currentProduct?.name}</strong> ajouté au panier !
                </div>
                <button
                  type="button"
                  className="btn-close me-2"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={() => setShowToast(false)}
                ></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  );
};

export default ProductDetailPage;