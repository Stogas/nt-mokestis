import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [tax, setTax] = useState(0);
  const [inputValue, setInputValue] = useState('');

  function addProperty(value) {
    if (value > 0 && !properties.includes(value)) {
      setProperties((prevProps) => [...prevProps, value]);
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit() {
    const value = Number(inputValue);
              addProperty(value);
    setInputValue(''); // Clear the input field after adding
  }

  useEffect(() => {
    calculateTotal();
  }, [properties]); // Add any other dependencies if needed
  function calculateTotal() {
    let total = properties.reduce((acc, curr) => acc + curr, 0);
    setTotalValue(total);
    calculateTax(total);
  }

  function calculateTax(total) {
    let untaxedValue = Math.min(20000, total);
    let taxedValue1 = Math.max(0, Math.min(150000 - 20000, total - untaxedValue));
    let taxedValue2 = Math.max(0, Math.min(300000 - 150000, total - 150000 - untaxedValue));
    let taxedValue3 = Math.max(0, Math.min(500000 - 300000, total - 300000 - untaxedValue));
    let taxedValue4 = Math.max(0, total - 500000 - untaxedValue);

    let taxAmount =
      (taxedValue1 * 0.002) +
      (taxedValue2 * 0.005) +
      (taxedValue3 * 0.01) +
      (taxedValue4 * 0.02);

    setTax(taxAmount);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Tax Calculator</h1>
        <p>Add properties and calculate tax.</p>
        <div>
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

        {/* Display the list of properties */}
        <h2>Properties:</h2>
        <ul>
          {properties.map((property, index) => (
            <li key={index}>€{property.toFixed(2)}</li>
          ))}
        </ul>

        {/* Display total value and tax amount */}
        <h2>Total Value: €{totalValue.toFixed(2)}</h2>
        <h3>Tax Amount: €{tax.toFixed(2)}</h3>
      </header>
    </div>
  );
}

export default App;
