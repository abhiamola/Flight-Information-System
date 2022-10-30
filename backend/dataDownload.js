import {} from 'dotenv/config'
import axios from 'axios';

const apiKey = process.env.API_KEY;

export async function getRealTimeFlightData() {

    const res = await axios.get('https://airlabs.co/api/v9/flights?api_key=' + apiKey)
        .then(response => response.data.response)
        .catch(error => error)

    return res;
}

export async function getAirlinesData() {

    const res = await axios.get('https://airlabs.co/api/v9/airlines?api_key=' + apiKey)
        .then(response => response.data.response)
        .catch(error => error)

    return res;
}

export async function getAirportsData() {

    const res = await axios.get('https://airlabs.co/api/v9/airports?api_key=' + apiKey)
        .then(response => response.data.response)
        .catch(error => error)

    return res;
}

export async function getCitiesData() {

    const res = await axios.get('https://airlabs.co/api/v9/cities?api_key=' + apiKey)
        .then(response => response.data.response)
        .catch(error => error)

    return res;
}

export async function getCountriesData() {
    const res = await axios.get('https://airlabs.co/api/v9/countries?api_key=' + apiKey)
        .then(response => response.data.response)
        .catch(error => error)

    return res;
}