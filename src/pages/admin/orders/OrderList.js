import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../../../redux/actions/orderActions';
import { FiEye, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AdminLayout from '../../../components/layout/AdminLayout';
import moment from 'moment';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Fonction pour basculer l'accordéon
  const toggleCollapse = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container py-5">
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="container py-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container py-5">
        <h2 className="mb-4">Liste des Commandes</h2>

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover align-middle mb-0 table-responsive table-striped table-bordered">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Télephone</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const isOpen = expandedRow === order._id;
                  const totalAmount = order.items.reduce(
                    (sum, item) => sum + item.quantity * item.product.price,
                    0
                  );

                  return (
                    <React.Fragment key={order._id}>
                      <tr onClick={() => toggleCollapse(order._id)} style={{ cursor: 'pointer' }}>
                        <td><code>#{order._id.substring(0, 6)}</code></td>
                        <td>{order.firstName} {order.lastName}</td>
                        <td>{order.email}</td>
                        <td>+{order.postalCode?.indicatif} {order.phone}</td>
                        <td>{moment(order.createdAt).format("DD/MM/YYY HH:mm")}</td>
                        <td>
                          <span className={`badge ${
                            order.status === 'pending' ? 'bg-warning text-dark' :
                            order.status === 'processing' ? 'bg-info text-white' :
                            order.status === 'shipped' ? 'bg-primary text-white' :
                            order.status === 'delivered' ? 'bg-success text-white' :
                            'bg-danger text-white'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{totalAmount.toFixed(2)} F</td>
                        <td className="text-end">
                          {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                        </td>
                      </tr>
                      
                      {/* Ligne détaillée */}
                      {isOpen && (
                        <tr>
                          <td colSpan="8" className="p-0 bg-light">
                            <div className="accordion-collapse collapse show">
                              <table className="table table-sm mb-0">
                                <thead className="table-secondary">
                                  <tr>
                                    <th>Produit</th>
                                    <th>Prix unitaire</th>
                                    <th>Quantité</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            width="40"
                                            height="40"
                                            className="me-3 rounded"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/40 '}
                                          />
                                          <span>{item.product.name}</span>
                                        </div>
                                      </td>
                                      <td>{item.product.price.toFixed(2)} F</td>
                                      <td>x{item.quantity}</td>
                                      <td>{(item.product.price * item.quantity).toFixed(2)} F</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderList;