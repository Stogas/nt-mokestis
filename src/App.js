// src/App.js

import React, { useState } from 'react';
import PropertyInput from './components/PropertyInput';
import PropertyList from './components/PropertyList';
import Results from './components/Results';
import Description from './components/Description';

function App() {
  const [properties, setProperties] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [propertyName, setPropertyName] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleNameChange = (e) => {
    setPropertyName(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue || !propertyName) return;

    setProperties([
      ...properties,
      { name: propertyName, value: parseFloat(inputValue) },
    ]);
    setInputValue('');
    setPropertyName('');
  };

  const totalValue = properties.reduce((acc, property) => acc + property.value, 0);
  let tax = 0;
  if (totalValue > 20000) {
    const taxableAmount = Math.max(0, totalValue - 20000);
    if (taxableAmount <= 130000) {
      tax = taxableAmount * 0.002; // 0.2%
    } else if (taxableAmount <= 300000) {
      tax = 260 + ((taxableAmount - 150000) * 0.005); // 0.5% for the next €150,000
    } else if (taxableAmount <= 500000) {
      tax = 910 + ((taxableAmount - 300000) * 0.01); // 1% for the next €200,000
    } else {
      tax = 2110 + ((taxableAmount - 500000) * 0.02); // 2% above €500,000
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Tax Calculator for Lithuanian Residents</h1>
        <Description />
        <PropertyInput
          inputValue={inputValue}
          propertyName={propertyName}
          handleInputChange={handleInputChange}
          handleNameChange={handleNameChange}
          handleSubmit={handleSubmit}
        />

        <h2>Properties:</h2>
        <PropertyList properties={properties} />

        <div className="results-container">
          <Results totalValue={totalValue} tax={tax} />
        </div>
      </header>
    </div>
  );
}

export default App;
