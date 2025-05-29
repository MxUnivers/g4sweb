import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FiUpload } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { handleImageUploadCloud } from '../actions/upload/UploadCloud';
import { toast } from 'sonner';
import { updateProduct } from '../redux/actions/productActions';
import { useDispatch } from 'react-redux';

const EditProductModal = ({ show, onHide, onUpdate, product, categories }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [stock, setStock] = useState(product?.stock?.toString() || '');
  const [categoryId, setCategoryId] = useState(product?.category?._id || '');
  const [images, setImages] = useState(product?.images || []);
  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [currentHoveredImage, setCurrentHoveredImage] = useState(null);


  // Mise à jour des states quand le produit change
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setCategoryId(product.category?._id || '');
      setExistingImages(product?.images || []);
      setImages(product?.images || []);
    }
  }, [product]);

  const handleSubmit = async () => {
    const formData = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: categoryId,
      images: images
    };

    
    console.log(formData)

    try {
      await dispatch(updateProduct(product._id, formData));

      onHide();
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
    }
  };

  const handleImageChange = async (e) => {
    const newFiles = e.target.files;

    if (!newFiles || newFiles.length === 0) return;

    // Limiter à 10 fichiers max
    if (newFiles.length > 10) {
      toast.error("Vous ne pouvez pas sélectionner plus de 10 images.");
      return;
    }

    // Optionnel : limiter le total (si il y a déjà des images)
    const totalImages = images.length + newFiles.length;
    if (totalImages > 10) {
      toast.warning(`Vous ne pouvez pas dépasser 10 images au total. Vous en avez déjà ${images.length}.`);
      return;
    }

    try {
      // Upload des nouvelles images vers Cloudinary
      const uploadedUrls = await handleImageUploadCloud(newFiles);

      // Mettre à jour le state en ajoutant les nouvelles images
      setImages((prevImages) => [...prevImages, ...uploadedUrls]);
      setExistingImages((prevImages) => [...prevImages, ...uploadedUrls]);

      // Notification de succès
      toast.success(`${uploadedUrls.length} image(s) uploadée(s) avec succès !`);
    } catch (err) {
      console.error("Erreur lors de l'upload des images", err);
      toast.error("Échec de l'upload des images");
    }
  };

  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier le produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Nom */}
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Prix */}
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Prix (F)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          {/* Stock */}
          <Form.Group className="mb-3" controlId="productStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </Form.Group>

          {/* Catégorie */}
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Images existantes */}
      {existingImages.length > 0 ? (
        <div className="mb-3">
          <Form.Label>Images actuelles</Form.Label>
          <ul className="list-unstyled d-flex flex-wrap gap-2">
            {existingImages.map((img, index) => (
              <li key={`existing-${index}`} className="position-relative d-inline-block">
                <img
                  src={img}
                  alt={`Produit ${index}`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', transition: '2s east-in-out' }}
                  className="rounded border"
                  onMouseEnter={() => setCurrentHoveredImage(index)}
                  onMouseLeave={() => setCurrentHoveredImage(null)}
                />
                {currentHoveredImage === index && existingImages[index + 1] && (
                  <img
                    src={existingImages[index + 1]}
                    alt="Image suivante"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      opacity: 0.9,
                      zIndex: 10,
                      pointerEvents: 'none'
                    }}
                  />
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle"
                  onClick={() => removeExistingImage(index)}
                  title="Supprimer cette image"
                >
                  <MdClose size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-muted">Aucune image existante.</p>
      )}
          {/* Nouvelles images */}
          <Form.Group className="mb-3" controlId="productNewImages">
            <Form.Label>{existingImages.length > 0 ? "Ajouter des images supplémentaires" : "Uploader des images"}</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
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

export default EditProductModal;