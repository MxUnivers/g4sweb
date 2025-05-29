import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCategoryModal = ({ show, onHide, onUpdate, category }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [access, setAccess] = useState(true);

  useEffect(() => {
    if (category) {
      setName(category?.name||"");
      setDescription(category?.description || '');
      setAccess(category?.access|| "");
    }
  }, [category]);

  const handleSubmit = async () => {
    if (!name.trim() || !category?._id) return;

    try {
      await onUpdate(category._id, { name, description, access });
      onHide();
    } catch (err) {
      console.error('Erreur lors de l\'édition:', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier la catégorie</Modal.Title>
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
          Mettre à jour
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoryModal;