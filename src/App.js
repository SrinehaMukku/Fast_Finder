import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fetch the JSON data on component mount
  useEffect(() => {
    fetch("/path-to-your/countries.json")  // Update this with the correct path
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(err => console.error("Failed to load country data:", err));
  }, []);

  // Search function to filter countries based on country or capital
  const searchCountry = (input) => {
    setQuery(input);

    if (input.length > 0) {
      const filteredCountries = countries.filter((country) => {
        const countryName = country.country ? country.country.toLowerCase() : ""; // Access 'country'
        const capitalName = country.capital ? country.capital.toLowerCase() : ""; // Access 'capital'

        // Check if the input matches either the country name or the capital name
        return countryName.includes(input.toLowerCase()) || capitalName.includes(input.toLowerCase());
      });

      setResults(filteredCountries);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search by country or capital..." 
        value={query} 
        onChange={(e) => searchCountry(e.target.value)} 
        className="search-input"
      />
      <ul className="results-list">
        {results.length === 0 ? (
          <li>No results found</li>
        ) : (
          results.map((country, index) => (
            <li key={index}>
              <strong>{country.country}</strong> - {country.capital}
              <br />
              Population: {country.population ? country.population.toLocaleString() : "N/A"} | 
              Official Language: {country.official_language ? country.official_language : "N/A"} |
              Currency: {country.currency ? country.currency : "N/A"}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
