import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart, updateCartItem } from '../../redux/actions/cartActions';
import StoreLayout from '../../components/layout/StoreLayout';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [showClearModal, setShowClearModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    dispatch(updateCartItem(productId, newQuantity));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const confirmClearCart = () => {
    setShowClearModal(true);
  };

  const confirmCheckout = () => {
    setShowCheckoutModal(true);
  };

  const executeClearCart = () => {
    dispatch(clearCart());
    setShowClearModal(false);
  };

  const executeCheckout = () => {
    // Ici tu peux rediriger vers une page de paiement ou passer la commande
    setShowCheckoutModal(false);
    toast.success("Commande validée !");
    navigate(`/checkout`);
  };

  return (
    <StoreLayout>
      <div className="container py-5">
        <div className="mb-4 p-4 bg-white rounded shadow-sm border-start border-4 border-danger">
          <h1 className="text-3xl font-bold text-dark mb-2">
            Votre Panier
          </h1>
        </div>
        
        {items.length === 0 ? (
          <div className="alert alert-secondary mb-5 text-center">Votre panier est vide.</div>
        ) : (
          <div className="row g-4">
            {/* Liste des produits */}
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  {items.map((item) => (
                    <div key={item.product._id} className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                      <div className="d-flex align-items-center">
                        <div style={{ width: '80px', height: '80px' }} className="me-3">
                          <img
                            src={item.product.images?.[0]}
                            alt={item.product.name}
                            className="w-100 h-100 object-cover rounded"
                          />
                        </div>
                        <div>
                          <h5 className="mb-1">{item.product.name}</h5>
                          <p className="mb-0 text-primary fw-bold">{item.product.price.toFixed(2)} F</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <div className="input-group input-group-sm me-2" style={{ width: '100px' }}>
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            value={item.quantity}
                            readOnly
                            style={{ fontSize: '0.9rem' }}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveItem(item.product._id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Résumé commande */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 sticky-top" style={{ top: '80px',  zIndex: 50 }}>
                <div className="card-body">
                  <h5 className="card-title">Récapitulatif</h5>
                  <hr />

                  <div className="d-flex justify-content-between mb-3">
                    <span>Nombre d'articles :</span>
                    <strong>{items.reduce((acc, item) => acc + item.quantity, 0)}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Total</span>
                    <strong>{total.toFixed(2)} F</strong>
                  </div>

                  <hr />

                  <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-success" onClick={confirmCheckout}>
                      Valider la commande
                    </button>
                    <button className="btn btn-outline-danger" onClick={confirmClearCart}>
                      Vider le panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lien retour */}
        {items.length === 0 && (
          <div className="text-center">
            <Link to="/products" className="btn btn-danger">
              ← Retour aux produits
            </Link>
          </div>
        )}
      </div>

      {/* Modale : Vider le panier */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer le vidage du panier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Êtes-vous sûr de vouloir vider votre panier ? Cette action est irréversible.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={executeClearCart}>
            Vider le panier
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale : Valider la commande */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Vous êtes sur le point de valider une commande de <strong>{items.reduce((acc, item) => acc + item.quantity, 0)} article(s)</strong> pour un montant total de <strong>{total.toFixed(2)} F</strong>. Êtes-vous sûr de vouloir continuer ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={executeCheckout}>
            Valider la commande
          </Button>
        </Modal.Footer>
      </Modal>
    </StoreLayout>
  );
};

export default CartPage;