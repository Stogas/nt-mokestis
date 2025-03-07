// src/components/Results.js

import React from 'react';

function Results({ totalValue, tax }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Total Value</td>
          <td>€{totalValue.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Tax Amount</td>
          <td>€{tax.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Results;
