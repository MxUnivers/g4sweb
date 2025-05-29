import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { GET_PRODUCT } from '../../../redux/actions/types';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
    const  dispatch  =  useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [];

  return (
    <div className="card h-100 w-100 shadow-sm border-0">
      <div
        className="position-relative overflow-hidden"
        onMouseEnter={() => setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <img
          src={images[currentImageIndex] || '/default-product.jpg'}
          alt={product.name}
          className="card-img-top"
          style={{ height: '400px', width:"100%", objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-success">{product.category?.name || 'Non catégorisé'}</span>
        </div>
      </div>

      <div className="card-body w-100 d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none" onClick={()=>{dispatch({
              type: GET_PRODUCT,
              payload: product
            });}}>
          <h5 className="card-title text-dark">{product.name}</h5>
        </Link>
        <p className="card-text text-muted small flex-grow-1">{product.description.substring(0, 60)}...</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <strong className="text-primary fs-5">{product.price.toFixed(2)} F</strong>
          <button className="btn btn-primary btn-sm">
            <FiShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;