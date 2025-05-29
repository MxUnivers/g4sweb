import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../redux/actions/categoryActions';
import { getProducts } from '../../redux/actions/productActions';
import StoreLayout from '../../components/layout/StoreLayout';
import ProductCard from '../../containers/products/ProductCard';
import ProductFiltersModal from '../../modals/ProductFilterModal';

// Pour le filtre de prix
import { Range } from 'react-range';

const STEP = 1;
const MIN_PRICE = 1;
const MAX_PRICE = 10000000;

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({
    name: '',
    categoryId: '',
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
  });

  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Charger les catégories au montage
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts(filters));
  }, [dispatch]);

  // Appliquer les filtres
  useEffect(() => {
    dispatch(getProducts(filters));
  }, [filters]);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, categoryId: e.target.value });
  };

  const handlePriceChange = (values) => {
    setPriceRange(values);
    setFilters({ ...filters, minPrice: values[0], maxPrice: values[1] });
  };

  const applyFilters = () => {
    dispatch(getProducts(filters));
    setShowMobileFilters(false);
  };

  const resetFilters = () => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setFilters({
      name: '',
      categoryId: '',
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE
    });
    dispatch(getProducts({}));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <StoreLayout>
      <div className="container py-5">
        <div className="mb-4 p-4 bg-white rounded shadow-sm border-start border-4 border-danger">
          <h1 className="text-3xl font-bold text-dark mb-2">
            Tous les Produits
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-4"></h2>

        {/* Barre de recherche et filtres mobile */}
        <div className="d-flex flex-wrap align-items-center gap-3 mb-4 justify-content-between">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={filters.name}
            onChange={handleSearchChange}
            className="form-control w-auto flex-grow-1 d-md-none ms-auto"
          />

          <button
            className="btn btn-outline-danger d-md-none ms-auto"
            onClick={() => setShowMobileFilters(true)}
          >
            Filtres
          </button>
        </div>

        <div className="row g-4">
          {/* Sidebar Filtres (col-md-3) */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0 sticky-md-top" style={{ top: '80px',  zIndex: 50 }}>
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">Filtrer par</h5>

                <hr className="my-3" />

                {/* Recherche */}
                <div className="mb-3">
                  <label className="form-label">Nom du produit</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher..."
                    value={filters.name}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Catégorie */}
                <div className="mb-3">
                  <label className="form-label">Catégorie</label>
                  <select
                    className="form-select"
                    value={filters.categoryId}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prix */}
                <div className="mb-3">
                  <label className="form-label">Prix</label>
                  <Range
                    step={STEP}
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    values={priceRange}
                    onChange={(values) => handlePriceChange(values)}
                    renderTrack={({ props, children }) => (
                      <div {...props} className="range-track" style={{
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc"
                      }}>
                        {children}
                      </div>
                    )}
                    renderThumb={({ index, props }) => (
                      <div {...props} className="bg-danger" style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                      }}  />
                    )}
                  />
                  <div className="mt-2 d-flex justify-content-between">
                    <span>{priceRange[0]} F</span>
                    <span>{priceRange[1]} F</span>
                  </div>
                </div>

                {/* Boutons */}
                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-danger" onClick={applyFilters}>
                    Appliquer les filtres
                  </button>
                  <button className="btn btn-outline-secondary" onClick={resetFilters}>
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne principale (col-md-9) */}
          <div className="col-md-9" style={{ minHeight: "100vh" }}>
            {loading ? (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="alert alert-secondary text-center">
                Aucun produit trouvé.
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {paginatedProducts.map((product) => (
                    <div key={product._id} className="col-md-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <nav className="mt-5">
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <li
                        key={i + 1}
                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>

        {/* Modale mobile */}
        <ProductFiltersModal
          show={showMobileFilters}
          onHide={() => setShowMobileFilters(false)}
          filters={filters}
          onApply={applyFilters}
          onReset={resetFilters}
          onPriceChange={setPriceRange}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />
      </div>
    </StoreLayout>
  );
};

export default ProductListPage;