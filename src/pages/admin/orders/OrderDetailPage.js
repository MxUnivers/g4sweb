import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderById } from '../../../redux/actions/orderActions';
import { Table, Card, Button } from 'react-bootstrap';
import AdminLayout from '../../../components/layout/AdminLayout';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.orders);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  useEffect(() => {
    if (!loading && currentOrder && currentOrder.items) {
      const amount = currentOrder.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );
      setTotalAmount(amount);
    }
  }, [currentOrder, loading]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !currentOrder) {
    return (
      <AdminLayout>
        <div className="alert alert-danger text-center my-5">
          {error || "Commande introuvable"}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Détails de la commande #{ currentOrder && currentOrder?._id ? currentOrder?._id.substring(0, 8):""}</h2>
          <Link to="/admin/orders" className="btn btn-outline-danger">
            Retour à mes commandes
          </Link>
        </div>

        {/* Informations client */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h5 className="mb-3">Informations client</h5>
            <p><strong>Nom :</strong> {currentOrder?.firstName || ""} {currentOrder?.lastName || ""}</p>
            <p><strong>Email :</strong> {currentOrder?.email || ""}</p>
            <p><strong>Téléphone :</strong> {currentOrder?.phone || ""}</p>
            <p><strong>Adresse :</strong> {currentOrder?.address || ""}, {currentOrder?.postalCode || ""}</p>
          </Card.Body>
        </Card>

        {/* Produits */}
        <Card className="shadow-sm">
          <Card.Header className="bg-white">
            <h5 className="mb-0">Produits commandés</h5>
          </Card.Header>
          <Table responsive bordered hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Produit</th>
                <th>Prix unitaire</th>
                <th>Quantité</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {currentOrder && currentOrder.items && currentOrder.items.length > 0 ?
              currentOrder.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item && item.product && item.product.images && item.product.images.length > 0 ?item.product.images[0]:""}
                        alt={item?.product?.name|| ""}
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        className="me-3 rounded"
                      />
                      <span>{item?.product?.name||""}</span>
                    </div>
                  </td>
                  <td>{ item && item.product && item.product.price ?item.product.price.toFixed(2):"0"} F</td>
                  <td>x{item && item.quantity ? item.quantity :""}</td>
                  <td>{item && item.product && item.product.price && item.quantity ? (item.product.price * item.quantity).toFixed(2):"0"} F</td>
                </tr>
              )):""}
              <tr>
                <td colSpan="3" className="text-end fw-bold">Total</td>
                <td className="fw-bold">{totalAmount.toFixed(2)} F</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default OrderDetailsPage;