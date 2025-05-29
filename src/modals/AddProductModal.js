import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FiUpload } from 'react-icons/fi';

const AddProductModal = ({ show, onHide, onSubmit, newProduct, handleChange, handleFileChange, categories }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newProduct.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImages">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Créer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;