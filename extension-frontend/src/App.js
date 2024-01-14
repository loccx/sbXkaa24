import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [backendResponse, setBackendResponse] = useState('');

  useEffect(() => {
    axios.get('/tree')
      .then(response => {
        setBackendResponse(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the backend:', error);
      });
  }, []);

  const handleSearch = () => {
    axios.post('/', { query: searchQuery })
      .then(response => {
        console.log('Backend response:', response.data);
      })
      .catch(error => {
        console.error('Error sending search query to the backend:', error);
      });
  };

  return (
    <div>
      <h1>Your React App</h1>
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
      <div>
        <p>Response from Backend: {backendResponse}</p>
      </div>
    </div>
  );
}

export default App;
