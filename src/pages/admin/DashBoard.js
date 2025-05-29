import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getProducts } from "../../redux/actions/contactActions";
import { getCategories } from "../../redux/actions/categoryActions";
import { getOrders } from "../../redux/actions/orderActions";
import { getCustomers } from "../../redux/actions/customerActions";
import { getTransactions } from "../../redux/actions/transactionActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { customers, loading: customersLoading } = useSelector((state) => state.customers);
  const { transactions, loading: transactionsLoading } = useSelector((state) => state.transactions);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getOrders());
    dispatch(getCustomers());
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (!productsLoading && !ordersLoading && !transactionsLoading) {
      // Calcul du chiffre d'affaires total
      const totalRevenue = transactions.reduce((sum, transaction) => {
        return transaction.status === "success" ? sum + transaction.amount : sum;
      }, 0);

      // Nombre de commandes en attente
      const pendingOrders = orders.filter((order) => order.status === "pending").length;

      // Produits en stock faible (< 10)
      const lowStockProducts = products.filter((product) => product.stock < 10).length;

      setStats({ totalRevenue, pendingOrders, lowStockProducts });
    }
  }, [products, orders, transactions, productsLoading, ordersLoading, transactionsLoading]);

  const isLoading = productsLoading || categoriesLoading || ordersLoading || customersLoading || transactionsLoading;

  // Récupérer les dernières commandes (5 plus récentes)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h1 className="h2 mt-4 mb-4 text-dark">Tableau de bord</h1>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              {/* Total Revenue */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-currency-euro text-success" viewBox="0 0 16 16">
                        <path d="M4 9.467V7.07H3.5A1.5 1.5 0 0 0 2 8.57v2.398h-.5V10a1.5 1.5 0 0 0 1.5-1.5v-.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M5.07 14.133c-.844.467-2.05.73-3.57.73C.57 14.863 0 14.293 0 13.58c0-1.084 1.366-1.636 2.92-2.07L3.5 11.35c1.39-.39 2.508-.73 2.508-2.03 0-1.44-1.217-2.03-2.65-2.03-1.49 0-2.592.65-3.44 1.11l-.22-.54c.974-.46 2.22-.88 3.7-.88 1.21 0 2.05.58 2.05 1.68 0 1.08-.76 1.68-2.31 2.09l-1.3.34c-1.49.39-2.5.75-2.5 2.02 0 1.37 1.07 2.15 2.7 2.15 1.19 0 2.52-.38 3.52-.96zm2.43 0.01h1.32v-6.7h1.31v6.7h1.32v0.8H7.5v-0.8z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Chiffre d'affaires</p>
                      <h5 className="mb-0">{stats.totalRevenue.toFixed(2)} F</h5>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-seam text-primary" viewBox="0 0 16 16">
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.814 3.5l2.415 2.415L10.686 1.5zm-1.404 5.5 2.415 2.415L15.794 3.5l-2.415-2.415zM3.5 11.916l2.415 2.415L15.47 8.5l-2.415-2.415zM8 12c-.5 0-1-.22-1.357-.577l-2.415-2.415L12.886 1.357A1.993 1.993 0 0 1 13.43 3.1l-7.417 7.417A1.99 1.99 0 0 1 8 12z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Total Produits</p>
                      <h5 className="mb-0">{products.length}</h5>
                    </div>
                  </div>
                  <div className="card-footer py-2 bg-transparent border-top-0">
                    <Link to="/admin/products" className="small link-primary text-decoration-none">
                      Voir tous les produits
                    </Link>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cart text-warning" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Commandes en attente</p>
                      <h5 className="mb-0">{stats.pendingOrders}</h5>
                    </div>
                  </div>
                  <div className="card-footer py-2 bg-transparent border-top-0">
                    <Link to="/admin/orders" className="small link-primary text-decoration-none">
                      Voir toutes les commandes
                    </Link>
                  </div>
                </div>
              </div>

              {/* Customers */}
              {/* <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="bg-purple bg-opacity-10 rounded-circle p-3 me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-people-fill text-purple" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 4 5 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.073c.402-.222.847-.465 1.327-.73a1.724 1.724 0 0 0-1.04-3.294l-.12.039a1.75 1.75 0 0 0-1.495 1.048l-.114.266c-.27.642-.657 1.2-.99 1.68z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Clients</p>
                      <h5 className="mb-0">{customers.length}</h5>
                    </div>
                  </div>
                  <div className="card-footer py-2 bg-transparent border-top-0">
                    <Link to="/admin/customers" className="small link-primary text-decoration-none">
                      Voir tous les clients
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="row">
              {/* Recent Orders */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Commandes récentes</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Statut</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order._id}>
                              <td>
                                <Link to={`/admin/orders/${order._id}`} className="link-primary">
                                  #{order._id.substring(0, 8)}
                                </Link>
                              </td>
                              <td>{order.firstName} {order.lastName}</td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td>
                                <span className={`badge ${
                                  order.status === "pending"
                                    ? "bg-warning text-dark"
                                    : order.status === "processing"
                                    ? "bg-info"
                                    : order.status === "shipped"
                                    ? "bg-secondary"
                                    : order.status === "delivered"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {recentOrders.length === 0 && (
                            <tr>
                              <td colSpan="4" className="text-center text-muted">
                                Aucune commande récente
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {orders.length > 5 && (
                      <div className="card-footer bg-white pt-2 pb-2">
                        <Link to="/admin/orders" className="small link-primary text-decoration-none float-end">
                          Voir toutes les commandes
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Low Stock Products */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Produits en stock faible</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Stock</th>
                            <th>Prix</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products
                            .filter((product) => product.stock < 10)
                            .slice(0, 5)
                            .map((product) => (
                              <tr key={product._id}>
                                <td>
                                  <Link to={`/admin/products/${product._id}`} className="link-primary">
                                    {product.name}
                                  </Link>
                                </td>
                                <td>{product.category?.name || "N/A"}</td>
                                <td>
                                  <span className={`badge ${
                                    product.stock === 0 ? "bg-danger" :
                                    product.stock < 5 ? "bg-warning text-dark" :
                                    "bg-info"
                                  }`}>
                                    {product.stock}
                                  </span>
                                </td>
                                <td>{product.price.toFixed(2)} F</td>
                              </tr>
                            ))}
                          {products.filter((product) => product.stock < 10).length === 0 && (
                            <tr>
                              <td colSpan="4" className="text-center text-muted">
                                Aucun produit en stock faible
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {products.filter((product) => product.stock < 10).length > 5 && (
                      <div className="card-footer bg-white pt-2 pb-2">
                        <Link to="/admin/products" className="small link-primary text-decoration-none float-end">
                          Voir tous les produits
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;