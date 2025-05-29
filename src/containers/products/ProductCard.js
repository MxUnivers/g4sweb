import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/actions/cartActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [hoverIndex, setHoverIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const images = product.images || [];
  const hasImages = images.length > 1;

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart(product, 1));
    
    // Animation et notification
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${product.name} ajouté au panier`, {
        icon: <i className="bi bi-cart-check"></i>,
        action: (
          <Link to="/cart" className="btn btn-sm btn-danger">
            Voir le panier
          </Link>
        ),
      });
    }, 300);
  };

  return (
    <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
      {/* Galerie d'images */}
      <div
        className="position-relative overflow-hidden"
        onMouseEnter={() => hasImages && setHoverIndex(1)}
        onMouseLeave={() => hasImages && setHoverIndex(0)}
        style={{ height: '200px' }}
      >
        <img
          src={images[hoverIndex] || '/default-product.jpg'}
          alt={product.name}
          className={`card-img-top h-100 w-100 object-cover transition-transform duration-300 ease-in-out ${isAdding ? 'scale-95 opacity-75' : 'scale-100'}`}
          style={{ transform: isAdding ? 'scale(0.95) translate(-50%, -50%)' : 'scale(1)' }}
        />

        {/* Badge catégorie */}
        {/* {product.category?.name && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-success">{product.category.name}</span>
          </div>
        )} */}

        {/* Mini gallery en bas si plusieurs images */}
        {hasImages && (
          <div className="position-absolute bottom-0 start-0 end-0 d-flex justify-content-center p-2 gap-1">
            {images.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`border rounded ${index === hoverIndex ? 'border-danger border-2' : 'border-secondary border'}`}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                onClick={() => setHoverIndex(index)}
              >
                <img
                  src={img}
                  alt={`${product.name} preview ${index + 1}`}
                  className="w-100 h-100 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contenu produit */}
      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <h5 className="card-title mb-2">{product.name}</h5>
        </Link>
        <p className="card-text text-muted small flex-grow-1">
          {product.description?.substring(0, 60)}{product.description?.length > 60 ? '...' : ''}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <strong className="text-danger fs-5">{product.price.toFixed(2)} F</strong>
          <button
            className={`btn btn-danger btn-sm ${isAdding ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Ajout...
              </>
            ) : (
              'Ajouter'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;