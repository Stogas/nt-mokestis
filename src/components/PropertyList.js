// src/components/PropertyList.js

import React from 'react';

function PropertyList({ properties }) {
  return (
    <table style={{ borderCollapse: "collapse", marginTop: 20 }}>
      <thead>
        <tr>
          <th>Property Name</th>
          <th>Value (€)</th>
        </tr>
      </thead>
      <tbody>
      {properties.map((property, index) => (
          <tr key={index}>
            <td>{property.name}</td>
            <td>{property.value.toFixed(2)}</td>
          </tr>
      ))}
      </tbody>
    </table>
  );
}

export default PropertyList;
