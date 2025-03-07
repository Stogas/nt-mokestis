// src/App.js

import React, { useState } from 'react';
import PropertyInput from './components/PropertyInput';
import PropertyList from './components/PropertyList';
import Results from './components/Results';

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
        <p>This application calculates the taxes that need to be paid based on the new real estate tax regulations in Lithuania.</p>
        <p>The app is designed to determine your tax obligations if you are a resident of Lithuania, owning one or more properties. It calculates the tax according to these rules:</p>
        <ul>
          <li>The first €20,000 value from the total property portfolio is untaxed (0%).</li>
          <li>For values above €20,000 and up to €150,000, the taxed amount at 0.2%.</li>
          <li>For values above €150,000 and up to €300,000, the taxed amount at 0.5%.</li>
          <li>For values above €300,000 and up to €500,000, the taxed amount at 1%.</li>
          <li>Any value exceeding €500,000 is taxed at 2%.</li>
        </ul>
        <p>The total tax is calculated based on the combined value of all properties you own.</p>

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
