import './App.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  //const axios = require('axios');

  const [flightData, setFlightData] = useState([]);

  function handleSubmit(e) {

    axios.get('http://localhost:8080/airlines')
      .then(response => {
        setFlightData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  return (
    <div className="App">
      <h1>SOEN-6441 Project</h1>
      <h1>Flights Information System</h1>
      <button onClick={handleSubmit}>Get Flights Data</button>
      {(flightData.length > 0) ? <div>
        <tbody>
          <tr>
            <th>Name</th>
            <th>ICAO Code</th>
            <th>IATA Code</th>
          </tr>
          {flightData.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.icaoCode}</td>
              <td>{item.iataCode}</td>
            </tr>
          ))}
        </tbody>
      </div> : <div></div>}
    </div>
  );
}

export default App;
