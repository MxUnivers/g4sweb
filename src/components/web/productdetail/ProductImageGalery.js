import React, { useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';

const ProductImageGallery = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Carousel activeIndex={index} onSelect={(i) => setIndex(i)} interval={null}>
        {images.map((img, i) => (
          <Carousel.Item key={i}>
            <img
              src={img}
              alt={`Image ${i + 1}`}
              className="d-block w-100"
              style={{ height: '400px', objectFit: 'contain' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Row className="mt-2 gx-2">
        {images.map((img, i) => (
          <Col key={i} xs={3} className="cursor-pointer">
            <img
              src={img}
              alt={`Miniature ${i + 1}`}
              className={`img-thumbnail ${i === index ? 'border border-danger' : ''}`}
              onClick={() => setIndex(i)}
              style={{ height: '70px', objectFit: 'cover' }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default ProductImageGallery;