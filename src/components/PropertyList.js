// src/components/PropertyList.js
import React from 'react';

function PropertyList({ properties }) {
  return (
    <ul>
      {properties.map((property, index) => (
        <li key={index}>€{property.toFixed(2)}</li>
      ))}
    </ul>
  );
}

export default PropertyList;
