import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const backendServerURL = 'https://kind-seals-reply.loca.lt';

function makeRequest(method, endpoint, data) {
  return axios({
    method: method,
    url: `${backendServerURL}${endpoint}`,
    data: data
  });
}

function searchEcosia(query) {
  makeRequest('post', '/', { query: query })
    .then(response => {
      console.log("Search response:", response.data);
    })
    .catch(error => {
      console.error("Error in Ecosia search:", error);
    });
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    searchEcosia(searchQuery);
  };

  return (
    <div className="container">
      <h1>TreeSearch</h1>
      <div>
        <label>
          Search Query:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default App;
