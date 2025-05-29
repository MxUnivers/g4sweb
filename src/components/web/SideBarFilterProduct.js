import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { Range } from "react-range";


const SideBarFilterProduct = () => {
    const [values, setValues] = useState([50, 20000]); // Valeurs Min et Max du prix
    return (
        <div className="shop-side-action">
            {/* Catégories */}
            <div className="action-item">
                <div className="action-top">
                    <span className="action-title">PRODUCT CATEGORY</span>
                </div>
                <div>
                    <div style={{ overflowY: "scroll", maxHeight: "100px" }}>

                        {[
                            { title: "Kids", count: 10, items: ["Clothes", "Shoes", "Toys"] },
                            { title: "Mens", count: 23, items: ["Clothes", "Shoes", "Glasses", "Watches", "Accessories"] },
                            { title: "Women", count: 14, items: ["Clothes", "Shoes", "Glasses", "Makeups", "Accessories"] },
                        ].map((category, index) => (
                            <div key={index} className="category-item">
                                <div className="category-item-inner">
                                    <div className="category-title-area">
                                        <span className="point"></span>
                                        <span className="category-title">{category.title} ({category.count})</span>
                                    </div>
                                </div>
                                <ul className="sub-categorys-inner">
                                    {category.items.map((item, idx) => (
                                        <li key={idx}>
                                            <span className="point"></span>
                                            <a href="shop.html">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filtrer par prix */}
            <div className="action-item mt-3">
                <div className="action-top">
                    <span className="action-title">Prix</span>
                </div>

                {/* Affichage des valeurs sélectionnées */}
                <div className="range-label-area d-flex justify-content-between">
                    <span>Min: ${values[0]}</span>
                    <span>Max: ${values[1]}</span>
                </div>

                {/* Slider interactif */}
                <div className="price-slider-container">
                    <Range
                        step={50} // Incréments de 50
                        min={50}
                        max={20000}
                        values={values}
                        onChange={(newValues) => setValues(newValues)}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: "6px",
                                    width: "100%",
                                    backgroundColor: "#007bff",
                                    borderRadius: "5px",
                                    marginTop: "10px",
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: "20px",
                                    width: "20px",
                                    backgroundColor: "#fff",
                                    borderRadius: "50%",
                                    border: "2px solid #007bff",
                                    cursor: "pointer",
                                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                                }}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Filtrer par couleur */}
            <div className="action-item mt-3">
                <div className="action-top">
                    <span className="action-title">Couleurs</span>
                </div>
                <div className="d-flex flex-wrap">
                    {["Black", "Blue", "Gray", "Green", "Red", "Yellow"].map((color, index) => (
                        <span key={index} className="m-2 badge bg-secondary">{color}</span>
                    ))}
                </div>
            </div>

            {/* Filtrer par marque */}
            <div className="action-item mt-3">
                <div className="action-top">
                    <span className="action-title">Marques</span>
                </div>
                <ul className="list-unstyled" style={{ overflowY: "scroll", maxHeight: "150px" }}>
                    {["Nike", "Adidas", "Balenciaga", "Burberry", "Chloé", "Givenchy", "Versace"].map((brand, index) => (
                        <li key={index}><a href="shop.html">{brand}</a></li>
                    ))}
                </ul>
            </div>
            <Button variant='dark' className="w-100"><MdSearch/> Rechercher</Button>
        </div>
    );
};



export default SideBarFilterProduct
