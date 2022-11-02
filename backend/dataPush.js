import mysql from 'mysql2';
import { getAirlinesData, getCountriesData, getAirportsData, getCitiesData, getRealTimeFlightData } from './dataDownload.js';
import { } from 'dotenv/config'

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: dbUser,
    password: dbPass,
    database: 'flights_db'
}).promise();

async function tableCreation() {

    const airlinesResponse = await pool.query(
        `create table airlines (icao_code varchar(20) primary key, iata_code varchar(20), name varchar(200))`
    );

    const countriesResponse = await pool.query(
        `create table countries (code varchar(20) primary key, code3 varchar(20), name varchar(200))`
    );

    const airportsResponse = await pool.query(
        `create table airports (icao_code varchar(20) primary key, iata_code varchar(20), 
        name varchar(200), lat float, lng float, country_code varchar(20), foreign key (country_code) references countries(code))`
    );

    const citiesResponse = await pool.query(
        `create table cities (city_code varchar(20) primary key, name varchar(100), lat float, 
        lng float, country_code varchar(20), foreign key (country_code) references countries(code))`
    );

    const realTimeFlightDataResponse = await pool.query(
        `create table realTimeFlightData (hex varchar(20) primary key, reg_number varchar(20), flag varchar(20), lat float, lng float, 
        alt int, dir int, speed int, v_speed int, squawk int, flight_number varchar(20), flight_icao varchar(20), flight_iata varchar(20), 
        dep_icao varchar(20), dep_iata varchar(20), arr_icao varchar(20), arr_iata varchar(20), airline_icao varchar(20), airline_iata varchar(20), 
        aircraft_icao varchar(20), updated bigint, status varchar(20), foreign key (dep_icao) references airports(icao_code), 
        foreign key (arr_icao) references airports(icao_code), foreign key (airline_icao) references airlines(icao_code))`

    );

    console.log("tables created");
}

async function dataInsert() {

    console.log('getting airlines');
    const airlines = await getAirlinesData();
    console.log(`got ${airlines.length} airlines`);
    var airline_icao = [];
    let k = 0;

    for (let i = 0; i < airlines.length; i++) {

        if (airlines[i].icao_code && !airline_icao.includes(airlines[i].icao_code)) {

            const airlinesResponse = await pool.query(
                `insert into airlines (icao_code, iata_code, name) values(?, ?, ?)`,
                [airlines[i].icao_code, airlines[i].iata_code, airlines[i].name]
            );
            airline_icao.push(airlines[i].icao_code);
        }
    }

    console.log('getting countries');
    const countries = await getCountriesData();

    for (let i = 0; i < countries.length; i++) {

        const countriesResponse = await pool.query(
            `insert into countries (code, code3, name) values(?, ?, ?)`,
            [countries[i].code, countries[i].code3, countries[i].name]
        );
    }

    console.log('getting airports');
    const airports = await getAirportsData();
    var airports_icao = [];
    k = 0;

    for (let i = 0; i < airports.length; i++) {

        if (airports[i].icao_code && !airports_icao.includes(airports[i].icao_code)) {

            const airportsResponse = await pool.query(
                `insert into airports (icao_code, iata_code, name, lat, lng, country_code) values(?, ?, ?, ?, ?, ?)`,
                [airports[i].icao_code, airports[i].iata_code, airports[i].name, airports[i].lat, airports[i].lng, airports[i].country_code]
            );
            airports_icao.push(airports[i].icao_code);
        }
    }

    console.log('getting cities');
    const cities = await getCitiesData();

    for (let i = 0; i < cities.length; i++) {
        const citiesResponse = await pool.query(
            `insert into cities (city_code, name, lat, lng, country_code) values(?, ?, ?, ?, ?)`,
            [cities[i].city_code, cities[i].name, cities[i].lat, cities[i].lng, cities[i].country_code]
        );
    }

    console.log('getting realtime flights');
    const rData = await getRealTimeFlightData();

    for (let i = 0; i < rData.length; i++) {
        if (airline_icao.includes(rData[i].airline_icao) && airports_icao.includes(rData[i].dep_icao) && airports_icao.includes(rData[i].arr_icao)) {
            
            const realTimeFlightDataResponse = await pool.query(
                `insert into realTimeFlightData (hex, reg_number, flag, lat, lng, alt, dir, speed, v_speed, squawk, flight_number, 
                flight_icao, flight_iata, dep_icao, dep_iata, arr_icao, arr_iata, airline_icao, airline_iata, aircraft_icao, 
                updated, status) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [rData[i].hex, rData[i].reg_number, rData[i].flag, rData[i].lat, rData[i].lng, rData[i].alt, rData[i].dir, rData[i].speed,
                rData[i].v_speed, rData[i].squawk, rData[i].flight_number, rData[i].flight_icao, rData[i].flight_iata, rData[i].dep_icao,
                rData[i].dep_iata, rData[i].arr_icao, rData[i].arr_iata, rData[i].airline_icao, rData[i].airline_iata, rData[i].aircraft_icao,
                rData[i].updated, rData[i].status]
            );
        }
    }

    console.log("data inserted");

}

tableCreation();
dataInsert();