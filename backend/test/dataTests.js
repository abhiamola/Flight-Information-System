import {DBManager} from "../data/DBManager.js";
import {TestGateway} from "./fakeData.js";

import should from "should";

describe('Data', function () {
    const dbManager = new DBManager(new TestGateway())

    describe('Airlines', async () => {
        const airlineMapper = dbManager.airlineMapper;

        it('Get all airlines', async () => {
            const res =  await airlineMapper.getAllWithOffset(0);
            res.should.have.length(3);
        })

    })

    describe('Flights', async () => {
        const flightMapper = dbManager.flightMapper;

        it('Get all flights with airport', async () => {
            const res = await flightMapper.getByAirport('YUL');

            res.should.have.length(2);
        })

        it('Get flight with id', async () => {
            const res = await flightMapper.getById('0102AC');

            res.airline.name.should.equal('Air France')
        })
    })

})