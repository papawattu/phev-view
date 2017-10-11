import chai from 'chai';
import sinon from 'sinon';
import CarController from './car-controller'
import config from '../config'
import { Observable } from 'rxjs'

const assert = chai.assert
const carService = {}
const registers = {}
const obj = {}
obj.map = sinon.stub().returnsThis()
obj.filter = sinon.stub().returnsThis()
registers.filter = sinon.stub().returnsThis()
registers.partition = sinon.stub().returns([obj])
registers.scan = sinon.stub()

carService.commandMessages = sinon.stub().returns(registers)

let dataHandlers = []

let data, operations

describe('Car Controller', () => {
    beforeEach(() => {
        data = CarController({ config, carService, dataHandlers }).data
        operations = CarController({ config, carService, dataHandlers }).operations
    })
    afterEach(() => {
        dataHandlers = []
    })
    it('Should bootstrap', () => {
        assert(data)
        assert(operations)
    })
    it('Should return data object with handler name', () => {
        const stub = sinon.stub().returns({ battery: {} })

        dataHandlers.push(['battery', stub])
        data = CarController({ config, carService, dataHandlers }).data
        assert(data.battery)
    })
    it('Should return data object with correct properties', done => {
        const stub = sinon.stub().returns(Observable.from([{ soc: 100 } ]))

        dataHandlers.push(['battery', stub])
        data = CarController({ config, carService, dataHandlers }).data
        
        const sub = data.battery.subscribe(x => {
            assert.equal(x.soc,100)
            done() 
        })
        
    })
})