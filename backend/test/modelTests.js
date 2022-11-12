import {Airline} from "../models/airline.js";
import {Airport} from "../models/airport.js";

import should from "should";

describe('Models', function () {

  describe('airline', function () {
    it('empty constructor should not work', function () {  
      (() => new Airline()).should.throw();
    });

    it('create airline', function() {
      const airline = new Airline("name", "icao", "iata");
      airline.should.not.be.null();

    })
  });

  describe('airport', function () {
    it('empty constructor should not work', function () {
      (() => new Airport()).should.throw();
    })

    it('create airport', function() {
      const airport = new Airport('iata', 'icao', 'name', 123, 324, 'country');
      airport.should.not.be.null();

    })
  });


});