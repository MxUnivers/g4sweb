import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PriceRangeFilter from '../components/web/products/PriceRangeFilter';

const ProductFiltersModal = ({
  show,
  onHide,
  filters,
  onApply,
  onReset,
  onPriceChange,
  onCategoryChange,
  categories
}) => {
  const [localMin, setLocalMin] = useState(filters.minPrice || 1);
  const [localMax, setLocalMax] = useState(filters.maxPrice || 500);

  const handleSubmit = () => {
    onApply();
    onHide();
  };

  const handleReset = () => {
    onReset();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} fullscreen="md-down" centered>
      <Modal.Header closeButton>
        <Modal.Title>Filtres</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <label className="form-label">Nom du produit</label>
          <input
            type="text"
            className="form-control"
            value={filters.name}
            onChange={(e) =>
              onApply({ ...filters, name: e.target.value })
            }
            placeholder="Rechercher..."
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Catégorie</label>
          <select
            className="form-select"
            value={filters.categoryId}
            onChange={onCategoryChange}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Prix</label>
          <PriceRangeFilter
            value={{ minPrice: filters.minPrice, maxPrice: filters.maxPrice }}
            onChange={onPriceChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReset}>
          Réinitialiser
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Appliquer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFiltersModal;