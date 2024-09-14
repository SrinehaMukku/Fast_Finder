import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fetch the JSON data on component mount
  useEffect(() => {
    fetch("/countries.json")  // Update this with the correct path
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(err => console.error("Failed to load country data:", err));
  }, []);

  // Search function to filter countries based on country or capital
  const searchCountry = (input) => {
    setQuery(input);

    if (input.length > 0) {
      const filteredCountries = countries.filter((country) => {
        const countryName = country.country ? country.country.toLowerCase() : "";
        const capitalName = country.capital ? country.capital.toLowerCase() : "";

        // Check if the input matches either the country name or the capital name
        return countryName.includes(input.toLowerCase()) || capitalName.includes(input.toLowerCase());
      });

      setResults(filteredCountries);
    } else {
      setResults([]);
    }
  };

  // Handle click on suggestion to autofill the input
  const handleSuggestionClick = (country) => {
    setQuery(country.country);  // Autofill the search input with the selected country name
    setResults([]);             // Clear the results after selection
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Search Countries and Capitals</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Search by country or capital..."
          value={query}
          onChange={(e) => searchCountry(e.target.value)}
          className="form-control"
        />
      </div>

      {results.length === 0 && query && (
        <div className="alert alert-warning text-center" role="alert">
          No results found
        </div>
      )}

      {results.length > 0 && (
        <ul className="list-group">
          {results.map((country, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(country)}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
            >
              <strong>{country.country}</strong> - {country.capital}
              <br />
              Population: {country.population ? country.population.toLocaleString() : "N/A"} |
              Official Language: {country.official_language ? country.official_language : "N/A"} |
              Currency: {country.currency ? country.currency : "N/A"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
