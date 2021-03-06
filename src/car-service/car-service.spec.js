import chai from 'chai';
import sinon from 'sinon';
import { Observable } from 'rxjs'
import CarService from './car-service'
import config from '../config'
import EventEmmiter from 'events'

const firebase = {}
const database = {}
const auth = {}
const ee = new EventEmmiter()
database.ref = sinon.stub()
database.ref.returns(ee)
firebase.database = sinon.stub()
firebase.database.returns(database)
const assert = chai.assert
global.fetch = sinon.spy()
config.baseUri = 'http://testapi'
auth.getToken = () => '1234'

const { sendMessage, commandMessages } = CarService({ config, auth, firebase })

describe('Car service send', () => {
    beforeEach(() => {

    })
    it('Should call fetch', () => {

        sendMessage({ register: 1, value: 2 })
        assert(global.fetch.calledOnce)

    })
    it('Should use correct base uri', () => {

        sendMessage({ register: 1, value: 2 })
        assert(global.fetch.calledWith('http://testapi/operations'))

    })
    it('Should send correct args', () => {
        sendMessage({ register: 1, value: 2 })
        assert(global.fetch.calledWith('http://testapi/operations',
            {
                body: JSON.stringify({
                    register: 1,
                    value: 2
                }),
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1234'
                },
            }
        ))
    })
})
describe('Command messages', () => {
    it('Should return an Observable', () => {
        const sut = commandMessages()

        assert.instanceOf(sut, Observable)
    })
    it('Should handle change events', done => {
        const sut = commandMessages()
        const data = {}
        data.val = sinon.stub().returns({ 1: { data: Buffer.from([2]) } })
        const sub = sut.subscribe(x => {
            assert.deepEqual(x, { register: 1, data: Buffer.from([2]) })
            sub.unsubscribe()
            done()
        })

        ee.emit('value', data)
    })
    it('Should handle multiple events', done => {
        let called = 0
        
        const sut = commandMessages()
        const data1 = {}
        data1.val = sinon.stub().returns({ 1: { data: Buffer.from([2]) } })
        
        const data2 = { key: '2', val: () => ({ data: Buffer.from([3]) }) }
        
        const sub = sut.subscribe(x => {
            if (data1.val.called) {
                assert.deepEqual(x, { register: 1, data: Buffer.from([2]) })
                data1.val.reset()
            } else {
                assert.deepEqual(x, { register: 2, data: Buffer.from([3]) })
                sub.unsubscribe()
                done()
            }
        })

        ee.emit('value', data1)
        ee.emit('child_changed', data2)
    })
})