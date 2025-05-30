import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getContacts } from "../../redux/actions/contactActions"; // Assurez-vous que cette action existe
import { Line } from "react-chartjs-2"; // Pour les graphiques
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import moment from "moment";

// Register required plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.contacts);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      applyFilters();
    }
  }, [contacts, filters]);

  // Appliquer les filtres
  const applyFilters = () => {
    let filtered = contacts;
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
        borderColor: "#bf2200",
        backgroundColor: "#cf2702",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category", // Register the category scale
        title: {
          display: true,
          text: "Mois",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Nombre de contacts",
        },
      },
    },
  };

  const isLoading = loading;

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h1 className="mt-4 mb-4 h2 text-dark">Tableau de bord</h1>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Total Contacts */}
              <div className="overflow-hidden bg-white rounded-lg shadow-md">
                <div className="flex items-center p-6 space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 p-3 rounded-full bg-red-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 13.186l-1.32-2.115-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Total Contacts</p>
                    <h5 className="text-xl font-semibold text-gray-800">{contacts.length}</h5>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <Link
                    to="/admin/contacts"
                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                  >
                    Voir tous les contacts
                  </Link>
                </div>
              </div>
            </div>
            {/* Filters */}
            <div className="mb-6">
              <div className="flex flex-row overflow-hidden bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h5 className="text-lg font-semibold text-gray-800">Filtrer les contacts</h5>
                </div>

                {/* Filtres */}
                <div className="p-6">
                  <div className="flex flex-row gap-4">
                    {/* Date de début */}
                    <div className="w-full sm:w-auto">
                      <label htmlFor="startDate" className="block mb-1 text-sm font-medium text-gray-700">
                        Date de début
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    {/* Date de fin */}
                    <div className="w-full sm:w-auto">
                      <label htmlFor="endDate" className="block mb-1 text-sm font-medium text-gray-700">
                        Date de fin
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Graph */}
            <div className="mb-4 row">
              <div className="col-lg-12">
                <div className="shadow-sm card">
                  <div className="card-header">
                    <h5 className="mb-0 card-title">Contacts par mois</h5>
                  </div>
                  <div className="card-body">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Contacts */}
            <div className="container p-4 mx-auto">
              <div className="overflow-hidden bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                  <h5 className="text-lg font-semibold text-gray-800">Contacts récents</h5>
                  <Link
                    to="/admin/contacts"
                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                  >
                    Voir tous les contacts
                  </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Table Header */}
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Nom
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Sujet
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Téléphone
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContacts.slice(0, 5).map((contact) => (
                        <tr key={contact._id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {contact.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-red-600 whitespace-nowrap hover:underline">
                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {contact.subjet || "Aucun sujet spécifié"}
                          </td>
                          <td className="px-6 py-4 text-sm text-green-600 whitespace-nowrap hover:underline">
                            <a href={`tel:${contact.phone}`}>
                              {contact.phone || "Non renseigné"}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {new Date(contact.createdAt).toLocaleDateString()}{" "}
                            {moment(contact.createdAt).format("HH:mm")}
                          </td>
                        </tr>
                      ))}

                      {/* No Data Row */}
                      {filteredContacts.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-sm italic text-center text-gray-500">
                            Aucun contact trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                {filteredContacts.length > 5 && (
                  <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
                    <Link
                      to="/admin/contacts"
                      className="text-sm font-medium text-red-600 transition hover:text-red-700"
                    >
                      Voir tous les contacts
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;