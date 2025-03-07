// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import PropertyInput from './components/PropertyInput';
import PropertyList from './components/PropertyList';
import Results from './components/Results';

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

  const calculateTotal = useCallback(() => {
    let total = properties.reduce((acc, curr) => acc + curr, 0);
    setTotalValue(total);
    calculateTax(total);
  }, [properties]); // dependencies include properties

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);
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
        <PropertyInput
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <h2>Properties:</h2>
        <PropertyList properties={properties} />
        <Results totalValue={totalValue} tax={tax} />
      </header>
    </div>
  );
}

export default App;
