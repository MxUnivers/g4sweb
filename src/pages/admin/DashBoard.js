import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getContacts } from "../../redux/actions/contactActions"; // Assurez-vous que cette action existe
import { Line } from "react-chartjs-2"; // Pour les graphiques

const Dashboard = () => {
  const dispatch = useDispatch();
  const { contacts, loading: contactsLoading } = useSelector((state) => state.contacts);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    if (!contactsLoading) {
      applyFilters();
    }
  }, [contacts, filters]);

  // Appliquer les filtres
  const applyFilters = () => {
    let filtered = contacts;

    if (filters.category) {
      filtered = filtered.filter((contact) => contact.category === filters.category);
    }

    if (filters.status) {
      filtered = filtered.filter((contact) => contact.status === filters.status);
    }

    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate).getTime();
      const end = new Date(filters.endDate).getTime();
      filtered = filtered.filter(
        (contact) =>
          new Date(contact.createdAt).getTime() >= start &&
          new Date(contact.createdAt).getTime() <= end
      );
    }

    setFilteredContacts(filtered);
  };

  // Données pour le graphique
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Nombre de contacts",
        data: Array(12).fill(0).map((_, i) =>
          filteredContacts.filter(
            (contact) => new Date(contact.createdAt).getMonth() === i
          ).length
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const isLoading = contactsLoading;

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
              {/* Total Contacts */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-envelope text-info"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 13.186l-1.32-2.115-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Total Contacts</p>
                      <h5 className="mb-0">{contacts.length}</h5>
                    </div>
                  </div>
                  <div className="card-footer py-2 bg-transparent border-top-0">
                    <Link to="/admin/contacts" className="small link-primary text-decoration-none">
                      Voir tous les contacts
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Filtrer les contacts</h5>
                    <div className="row g-3">
                      <div className="col-md-3">
                        <select
                          className="form-select"
                          value={filters.category}
                          onChange={(e) =>
                            setFilters({ ...filters, category: e.target.value })
                          }
                        >
                          <option value="">Toutes les catégories</option>
                          <option value="support">Support</option>
                          <option value="ventes">Ventes</option>
                          <option value="autres">Autres</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select
                          className="form-select"
                          value={filters.status}
                          onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
                          }
                        >
                          <option value="">Tous les statuts</option>
                          <option value="new">Nouveau</option>
                          <option value="in-progress">En cours</option>
                          <option value="resolved">Résolu</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="date"
                          className="form-control"
                          value={filters.startDate}
                          onChange={(e) =>
                            setFilters({ ...filters, startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="date"
                          className="form-control"
                          value={filters.endDate}
                          onChange={(e) =>
                            setFilters({ ...filters, endDate: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graph */}
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Contacts par mois</h5>
                  </div>
                  <div className="card-body">
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Contacts */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Contacts récents</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Catégorie</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredContacts.slice(0, 5).map((contact) => (
                            <tr key={contact._id}>
                              <td>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td>{contact.category}</td>
                              <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                          {filteredContacts.length === 0 && (
                            <tr>
                              <td colSpan="5" className="text-center text-muted">
                                Aucun contact trouvé
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {filteredContacts.length > 5 && (
                      <div className="card-footer bg-white pt-2 pb-2">
                        <Link to="/admin/contacts" className="small link-primary text-decoration-none float-end">
                          Voir tous les contacts
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