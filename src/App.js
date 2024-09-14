import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetch("/countries.json")
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(err => console.error("Failed to load country data:", err));
  }, []);

  const searchCountry = (input) => {
    setQuery(input);

    if (input.length > 0) {
      const filteredCountries = countries.filter((country) => {
        const countryName = country.country ? country.country.toLowerCase() : "";
        const capitalName = country.capital ? country.capital.toLowerCase() : "";

        return countryName.includes(input.toLowerCase()) || capitalName.includes(input.toLowerCase());
      });

      setResults(filteredCountries);
    } else {
      setResults([]);
    }
  };

  const handleSuggestionClick = (country) => {
    setQuery("");  // Clear the query
    setResults([]); // Clear the results
    setSelectedCountry(country);  // Set the selected country
    setShowDialog(true);  // Show the dialog box
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedCountry(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="search-header">
        Search for Countries and Capitals
      </h2>
      <div className="search-container">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text search-icon">
              <i className="fas fa-search"></i>
            </span>
          </div>

          <input
            type="text"
            placeholder="Search by country or capital..."
            value={query}
            onChange={(e) => searchCountry(e.target.value)}
            className="form-control search-input"
          />
        </div>
      </div>

      {results.length === 0 && query && !selectedCountry && (
        <div className="alert alert-warning text-center" role="alert">
          No results found
        </div>
      )}

      {results.length > 0 && !selectedCountry && (
        <ul className="list-group results-list">
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

      {showDialog && selectedCountry && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>{selectedCountry.country}</h3>
            <p><strong>Capital:</strong> {selectedCountry.capital}</p>
            <p><strong>Population:</strong> {selectedCountry.population ? selectedCountry.population.toLocaleString() : "N/A"}</p>
            <p><strong>Official Language:</strong> {selectedCountry.official_language ? selectedCountry.official_language : "N/A"}</p>
            <p><strong>Currency:</strong> {selectedCountry.currency ? selectedCountry.currency : "N/A"}</p>
            <button onClick={handleCloseDialog} className="btn btn-primary">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
