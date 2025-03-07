// src/components/PropertyInput.js
import React from 'react';

function PropertyInput({ inputValue, propertyName, handleInputChange, handleNameChange, handleSubmit }) {
  return (
    <div>
      <label htmlFor="propertyName">Property Name: </label>
      <input
        type="text"
        id="propertyName"
        name="propertyName"
        value={propertyName}
        onChange={handleNameChange}
      />
      <br />
      <label htmlFor="propertyValue">Property Value: </label>
      <input
        type="number"
        id="propertyValue"
        name="propertyValue"
        value={inputValue}
        onChange={handleInputChange}
        min="0"
      />
      <button onClick={handleSubmit}>Add Property</button>
    </div>
  );
}

export default PropertyInput;
