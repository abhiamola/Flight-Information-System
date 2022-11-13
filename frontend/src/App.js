import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedQuery, setSelectedQuery] = useState('Airline')

  const [airOffset, setAirOffset] = useState(0);
  const [airLimit, setAirLimit] = useState(5);
  const [flightId, setFlightId] = useState('004006');
  const [flyOffset, setFlyOffset] = useState(0);
  const [airportCode, setAirportCode] = useState('FVHA');
  const [countryCode, setCountryCode] = useState('PH');

  const [airlineData, setAirlineData] = useState([]);
  const [flightData, setFlightData] = useState(0);
  const [flyData, setFlyData] = useState(0);
  const [airportData, setAirportData] = useState(0);

  function handleSubmit(e) {

    axios.get('http://localhost:8080/airlines?offset=' + airOffset + '&limit=' + airLimit)
      .then(response => {
        setAirlineData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  function handleSubmit2(e) {

    axios.get('http://localhost:8080/flights/' + flightId)
      .then(response => {
        setFlightData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  function handleSubmit3(e) {

    axios.get('http://localhost:8080/flights?offset=' + flyOffset + '&airport=' + airportCode)
      .then(response => {
        setFlyData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  function handleSubmit4(e) {

    axios.get('http://localhost:8080/airports?country=' + countryCode)
      .then(response => {
        setAirportData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  const getQueryUI = (query) => {
      switch (query) {
          case "Airline":
              return <><h3>Airlines Data</h3>
                  <div className="myInput">Enter Offset<input type="text" className="form-control" required id="k1" value={airOffset} onChange={(e) => setAirOffset(e.target.value)} /></div>
                  <div className="myInput">Enter Limit <input type="text" className="form-control" required id="k1" value={airLimit} onChange={(e) => setAirLimit(e.target.value)} /> <br /></div>
                  <button className="btn btn-primary" onClick={handleSubmit}>Get Airlines Data</button>
                  {(airlineData.length > 0) ?
                      <table className="table"><tbody>
                      <tr>
                          <th>Name</th>
                          <th>ICAO Code</th>
                          <th>IATA Code</th>
                      </tr>
                      {airlineData.map((item, i) => (
                          <tr key={i}>
                              <td>{item.name}</td>
                              <td>{item.icaoCode}</td>
                              <td>{item.iataCode}</td>
                          </tr>
                      ))}</tbody>
                      </table>
                      : <div></div>}
                  <br /> <br /></>
          case "Flight":
              return <><h3>Flight Data</h3>

                  <div className="myInput">Enter Flight Id <input className="form-control" type="text" required id="k1" value={flightId} onChange={(e) => setFlightId(e.target.value)} /></div>
                  <br />
                  <button className="btn btn-primary" onClick={handleSubmit2}>Get Flight Data</button>
                  {(flightData) ? <div>
                          <table className="table"><tbody>
                          <tr>
                              <th>HexCode</th>
                              <th>Reg Number</th>
                              <th>Flag</th>
                              <th>Lattitude</th>
                              <th>Longitude</th>
                              <th>Alt</th>
                              <th>Dir</th>
                              <th>Speed</th>
                              <th>VSpeed</th>
                              <th>Squawk</th>
                              <th>Status</th>
                              <th>IataCode</th>
                              <th>IcaoCode</th>
                              <th>Flight Number</th>
                              <th>Airline_code</th>
                              <th>Departure_code</th>
                              <th>Arrival_code</th>
                          </tr>
                          <tr>
                              <td>{flightData.hexCode}</td>
                              <td>{flightData.regNumber}</td>
                              <td>{flightData.flag}</td>
                              <td>{flightData.lat}</td>
                              <td>{flightData.lng}</td>
                              <td>{flightData.alt}</td>
                              <td>{flightData.dir}</td>
                              <td>{flightData.speed}</td>
                              <td>{flightData.vSpeed}</td>
                              <td>{flightData.squawk}</td>
                              <td>{flightData.status}</td>
                              <td>{flightData.iataCode}</td>
                              <td>{flightData.icaoCode}</td>
                              <td>{flightData.flightNumber}</td>
                              <td>{flightData.airline.icaoCode}</td>
                              <td>{flightData.departureAirport.icaoCode}</td>
                              <td>{flightData.arrivalAirport.icaoCode}</td>
                          </tr>
                          </tbody></table><br />
                          Airline Information
                          <table className="table"><tbody>
                          <tr>
                              <th>Name</th>
                              <th>IcaoCode</th>
                              <th>IataCode</th>
                          </tr>
                          <tr>
                              <td>{flightData.airline.name}</td>
                              <td>{flightData.airline.icaoCode}</td>
                              <td>{flightData.airline.iataCode}</td>
                          </tr>
                          </tbody></table><br />
                          Departure Airport Information
                          <table className="table"><tbody>
                          <tr>
                              <th>IcaoCode</th>
                              <th>IataCode</th>
                              <th>Name</th>
                              <th>Lattitude</th>
                              <th>Longitude</th>
                              <th>Country Name</th>
                          </tr>
                          <tr>
                              <td>{flightData.departureAirport.icaoCode}</td>
                              <td>{flightData.departureAirport.iataCode}</td>
                              <td>{flightData.departureAirport.name}</td>
                              <td>{flightData.departureAirport.latitude}</td>
                              <td>{flightData.departureAirport.longitude}</td>
                              <td>{flightData.departureAirport.countryName}</td>
                          </tr>
                          </tbody></table><br />
                          Arrival Airport Information
                          <table className="table"><tbody>
                          <tr>
                              <th>IcaoCode</th>
                              <th>IataCode</th>
                              <th>Name</th>
                              <th>Lattitude</th>
                              <th>Longitude</th>
                              <th>Country Name</th>
                          </tr>
                          <tr>
                              <td>{flightData.arrivalAirport.icaoCode}</td>
                              <td>{flightData.arrivalAirport.iataCode}</td>
                              <td>{flightData.arrivalAirport.name}</td>
                              <td>{flightData.arrivalAirport.latitude}</td>
                              <td>{flightData.arrivalAirport.longitude}</td>
                              <td>{flightData.arrivalAirport.countryName}</td>
                          </tr>
                          </tbody></table>
                      </div>
                      : <div></div>}

                  <br /> <br /></>
          case "Flights By Airport":
              return <><h3>Flights By Airport</h3>

                  <div className="myInput">Enter Offset <input type="text" className="form-control" required id="k1" value={flyOffset} onChange={(e) => setFlyOffset(e.target.value)} /></div>
                  <div className="myInput">Enter Airport Code <input type="text" className="form-control" required id="k1" value={airportCode} onChange={(e) => setAirportCode(e.target.value)} /> <br /></div>
                  <button onClick={handleSubmit3} className="btn btn-primary">Get Flight Data</button>
                  {(flyData) ? <div>
                          <table className="table"><tbody>
                          <tr>
                              <th>HexCode</th>
                              <th>Reg Number</th>
                              <th>Flag</th>
                              <th>Lattitude</th>
                              <th>Longitude</th>
                              <th>Alt</th>
                              <th>Dir</th>
                              <th>Speed</th>
                              <th>VSpeed</th>
                              <th>Squawk</th>
                              <th>Status</th>
                              <th>IataCode</th>
                              <th>IcaoCode</th>
                              <th>Flight Number</th>
                              <th>Airline_code</th>
                              <th>Departure_code</th>
                              <th>Arrival_code</th>
                          </tr>
                          {flyData.map((item, i) => (
                              <tr key={i}>
                                  <td>{item.hexCode}</td>
                                  <td>{item.regNumber}</td>
                                  <td>{item.flag}</td>
                                  <td>{item.lat}</td>
                                  <td>{item.lng}</td>
                                  <td>{item.alt}</td>
                                  <td>{item.dir}</td>
                                  <td>{item.speed}</td>
                                  <td>{item.vSpeed}</td>
                                  <td>{item.squawk}</td>
                                  <td>{item.status}</td>
                                  <td>{item.iataCode}</td>
                                  <td>{item.icaoCode}</td>
                                  <td>{item.flightNumber}</td>
                                  <td>{item.airline.icaoCode}</td>
                                  <td>{item.departureAirport.icaoCode}</td>
                                  <td>{item.arrivalAirport.icaoCode}</td>
                              </tr>))}
                          </tbody></table>
                      </div>
                      : <div></div>}

                  <br /> <br /></>
          case "Airports By Country":
              return <><h3>Airports By Country</h3>

                  <div className="myInput">Enter Country Code <input type="text" className="form-control" required id="k1" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} /></div>
                  <br />
                  <button onClick={handleSubmit4} className="btn btn-primary">Get Airports Data</button>
                  {(airportData) ? <div>
                          <table className="table"><tbody>
                          <tr>
                              <th>IataCode</th>
                              <th>IcaoCode</th>
                              <th>Name</th>
                              <th>Lattitude</th>
                              <th>Longitude</th>
                              <th>Country Name</th>
                          </tr>
                          {airportData.map((item, i) => (
                              <tr key={i}>
                                  <td>{item.iataCode}</td>
                                  <td>{item.icaoCode}</td>
                                  <td>{item.name}</td>
                                  <td>{item.latitude}</td>
                                  <td>{item.longitude}</td>
                                  <td>{item.countryName}</td>
                              </tr>))}
                          </tbody></table>
                      </div>
                      : <div></div>}</>
      }
  }

  return (
    <div className="App">
      <h2>SOEN-6441 Project - Flights Information System</h2> <br />
      <select value={selectedQuery} onChange={e => setSelectedQuery(e.target.value)} className="form-select">
          <option value="Airline">Airline</option>
          <option value="Flight">Flight</option>
          <option value="Flights By Airport">Flights By Airport</option>
          <option value="Airports By Country">Airports By Country</option>
      </select>
        {getQueryUI(selectedQuery)}
    </div>
  );
}

      export default App;
