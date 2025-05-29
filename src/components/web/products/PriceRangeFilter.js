import React, { useState } from 'react';
import { Range } from 'react-range';

const STEP = 1;
const MIN_PRICE = 1;
const MAX_PRICE = 10000000;

const PriceRangeFilter = ({ value, onChange }) => {
  const [rangeValues, setRangeValues] = useState([
    value.minPrice || MIN_PRICE,
    value.maxPrice || MAX_PRICE,
  ]);

  const handleChange = (newValues) => {
    setRangeValues(newValues);
    onChange({ minPrice: newValues[0], maxPrice: newValues[1] });
  };

  return (
    <div>
      <Range
        step={STEP}
        min={MIN_PRICE}
        max={MAX_PRICE}
        values={rangeValues}
        onChange={(values) => handleChange(values)}
        renderTrack={({ props, children }) => (
          <div {...props} style={{
            height: "6px",
            width: "100%",
            backgroundColor: "#ccc",
            position: "relative"
          }}>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} style={{
            height: "20px",
            width: "20px",
            borderRadius: "50%",
            backgroundColor: "red",
            outline: "none"
          }} />
        )}
      />
      <div className="mt-2 d-flex justify-content-between">
        <strong>{rangeValues[0]} €</strong>
        <strong>{rangeValues[1]} €</strong>
      </div>
    </div>
  );
};

export default PriceRangeFilter;