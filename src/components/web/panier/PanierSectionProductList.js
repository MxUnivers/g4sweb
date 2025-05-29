import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ROUTES } from "../../../config/routing";
import { useNavigate } from "react-router-dom";

const initialCartProducts = [
    {
        id: 1,
        name: "Manteau en Laine",
        image: "https://img.freepik.com/psd-gratuit/manteau-laine-mode-isole-fond-transparent_191095-17703.jpg?w=900",
        price: 120,
        quantity: 2
    },
    {
        id: 2,
        name: "Veste Homme Marron",
        image: "https://img.freepik.com/psd-gratuit/veste-homme-marron-fond-transparent_191095-18203.jpg?w=900",
        price: 89.99,
        quantity: 1
    },
    {
        id: 3,
        name: "Blouson Moto Cuir",
        image: "https://img.freepik.com/psd-gratuit/blouson-moto-cuir-isole-fond-transparent_191095-17754.jpg?w=900",
        price: 150,
        quantity: 3
    }
];

const PanierSectionProductList = () => {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState(initialCartProducts);
    const [showModal, setShowModal] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState("domicile");

    // 🛒 Met à jour la quantité d'un produit
    const updateQuantity = (id, amount) => {
        setCartProducts(cartProducts.map(product =>
            product.id === id ? { ...product, quantity: Math.max(1, product.quantity + amount) } : product
        ));
    };

    // ❌ Supprime un produit du panier
    const removeProduct = (id) => {
        setCartProducts(cartProducts.filter(product => product.id !== id));
    };

    // 💰 Calcule le **total du panier**
    const subtotal = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <div className="rts-cart-section">
            <div className="container">
                <h4 className="section-title">Produits</h4>
                <div className="row justify-content-between">
                    {/* 📦 Liste des produits dans le panier */}
                    <div className="col-xl-7">
                        <div className="cart-table-area">
                            <table className="table table-bordered table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>
                                                <div className="product-thumb">
                                                    <img src={product.image} alt="product-thumb" width="80" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="product-title-area">
                                                    <h4 className="product-title">{product.name}</h4>
                                                </div>
                                            </td>
                                            <td><span className="product-price">${product.price.toFixed(2)}</span></td>
                                            <td>
                                                <div className="cart-edit">
                                                    <div className="quantity-edit">
                                                        <button className="button" onClick={() => updateQuantity(product.id, -1)}>
                                                            <i className="fal fa-minus minus"></i>
                                                        </button>
                                                        <input type="text" className="input" value={product.quantity} readOnly />
                                                        <button className="button plus" onClick={() => updateQuantity(product.id, 1)}>
                                                            <i className="fal fa-plus plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="last-td">
                                                <button className="remove-btn" onClick={() => removeProduct(product.id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* 🎁 Coupon */}
                            <div className="coupon-apply">
                                <span className="coupon-text">Coupon Code:</span>
                                <div className="apply-input">
                                    <input type="text" placeholder="Apply coupon here" />
                                    <button type="submit" className="apply-btn">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🛍️ Résumé du panier */}
                    <div className="col-xl-4">
                        <div className="checkout-box">
                            <div className="checkout-box-inner">
                                <div className="subtotal-area">
                                    <span className="title">Subtotal</span>
                                    <span className="subtotal-price">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="shipping-check">
                                    <span className="title">Options de Livraison</span>
                                    <div className="check-options">
                                        <Form>
                                            <Form.Check
                                                type="radio"
                                                label="Livraison à domicile"
                                                name="shipping"
                                                checked={selectedShipping === "domicile"}
                                                onChange={() => setSelectedShipping("domicile")}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Retrait en magasin"
                                                name="shipping"
                                                checked={selectedShipping === "magasin"}
                                                onChange={() => setSelectedShipping("magasin")}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Point relais"
                                                name="shipping"
                                                checked={selectedShipping === "relais"}
                                                onChange={() => setSelectedShipping("relais")}
                                            />
                                        </Form>
                                    </div>
                                </div>
                                <div className="total-area">
                                    <span className="title">Total</span>
                                    <span className="total-price">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button variant="primary" className="procced-btn" onClick={() => setShowModal(true)}>Valider le panier</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🛑 Modal de confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation de commande</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Confirmez-vous votre commande avec la livraison sélectionnée ?</p>
                    <ul>
                        {cartProducts.map(product => (
                            <li key={product.id}>
                                {product.quantity}x {product.name} - ${product.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total : ${subtotal.toFixed(2)}</strong></p>
                    <p><strong>Mode de livraison : </strong>{selectedShipping === "domicile" ? "Livraison à domicile" : selectedShipping === "magasin" ? "Retrait en magasin" : "Point relais"}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
                    <Button variant="success" onClick={() => {
                        setShowModal(false);
                        navigate(`/${ROUTES.CONFIRMATION_SUCCESSFUL}`);
                    }}>Confirmer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PanierSectionProductList;
