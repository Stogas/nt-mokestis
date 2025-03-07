// src/App.js
import React, { useState } from 'react';
import PropertyInput from './components/PropertyInput';
import PropertyList from './components/PropertyList';
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
        <PropertyList properties={properties.map(property => property.value)} />
      </header>
    </div>
  );
}

export default App;
