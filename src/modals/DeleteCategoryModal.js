import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCategoryModal = ({ show, onHide, onDelete, categoryName, categoryId }) => {
  const handleDelete = async () => {
    try {
      await onDelete(categoryId);
      onHide();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmer la suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Êtes-vous sûr de vouloir supprimer la catégorie <strong>{categoryName}</strong> ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategoryModal;