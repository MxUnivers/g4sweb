import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCategoryModal = ({ show, onHide, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [access, setAccess] = useState(true);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      await onCreate({ name, description, access });
      onHide();
    } catch (err) {
      console.error('Erreur lors de la création:', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une catégorie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de la catégorie"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description (optionnel)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Check
            type="switch"
            id="formAccess"
            label={access ? 'Actif' : 'Inactif'}
            checked={access}
            onChange={(e) => setAccess(e.target.checked)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Créer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;