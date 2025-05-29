import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteProductModal = ({ show, onHide, onDelete, productName }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmer la suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Êtes-vous sûr de vouloir supprimer le produit <strong>{productName}</strong> ? Cette action est irréversible.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;