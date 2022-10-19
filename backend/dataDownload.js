require('dotenv').config();

const axios = require('axios');

const apiKey = process.env.API_KEY

function getRealTimeFlightData() {

    axios.get('https://airlabs.co/api/v9/flights?api_key=' + apiKey)
        .then(response => {
            return response.data.response;
        })
        .catch(error => {
            console.log(error);
        });
}

function getAirlinesData() {

    axios.get('https://airlabs.co/api/v9/airlines?api_key=' + apiKey)
        .then(response => {
            return response.data.response;
        })
        .catch(error => {
            console.log(error);
        });
}

function getAirportsData() {

    axios.get('https://airlabs.co/api/v9/airports?api_key=' + apiKey)
        .then(response => {
            return response.data.response;
        })
        .catch(error => {
            console.log(error);
        });
}

function getCitiesData() {

    axios.get('https://airlabs.co/api/v9/cities?api_key=' + apiKey)
        .then(response => {
            return response.data.response;
        })
        .catch(error => {
            console.log(error);
        });
}

function getAirlineFleetsData() {

    axios.get('https://airlabs.co/api/v9/fleets?api_key=' + apiKey)
        .then(response => {
            return response.data.response;
        })
        .catch(error => {
            console.log(error);
        });
}

function getCountriesData() {

    axios.get('https://airlabs.co/api/v9/countries?api_key=' + apiKey)
        .then(response => {
            return response.data.response;
        })
        .catch(error => {
            console.log(error);
        });
}

function getTimezoneData() {

    axios.get('https://airlabs.co/api/v9/timezones?api_key=' + apiKey)
        .then(response => {
            return response.data.response;
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = { getRealTimeFlightData, getAirlinesData, getAirportsData, getCitiesData, getAirlineFleetsData, getCountriesData, getTimezoneData};