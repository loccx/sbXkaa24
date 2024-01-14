import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const backendServerURL = 'https://eager-months-clap.loca.lt';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    axios.post(`${backendServerURL}/`, { query: searchQuery })
      .then(response => {
        console.log('Backend response:', response.data);
      })
      .catch(error => {
        console.error('Error sending search query to the backend:', error);
      });
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
