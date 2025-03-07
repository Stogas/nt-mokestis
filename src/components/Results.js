// src/components/Results.js
import React from 'react';

function Results({ totalValue, tax }) {
  return (
    <>
      <h2>Total Value: €{totalValue.toFixed(2)}</h2>
      <h3>Tax Amount: €{tax.toFixed(2)}</h3>
    </>
  );
}

export default Results;
