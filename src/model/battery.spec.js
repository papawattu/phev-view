import chai from 'chai';
import sinon from 'sinon';
import {
    Observable
} from 'rxjs'
import Battery from './battery'
import codes from '../data/codes'

const assert = chai.assert

const testSOCRegister = [
    [codes.KO_WF_BATT_LEVEL_INFO_REP_EVR, Buffer.from([50, 0])]
]
const testSOCZeroRegister = [
    [codes.KO_WF_BATT_LEVEL_INFO_REP_EVR, Buffer.from([0, 0])]
]

const testOBCRegister = [
    [codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR, Buffer.from([1, 0, 0])]
]
const testOBCFalseRegister = [
    [codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR, Buffer.from([0, 0, 0])],
]

const registerMapSOC = new Map(testSOCRegister)
const registerMapSOCZero = new Map(testSOCZeroRegister)

const registerMapOBC = new Map(testOBCRegister)
const registerMapOBCFalse = new Map(testOBCFalseRegister)

const socRegisters = Observable.from([registerMapSOC])
const socZeroRegisters = Observable.from([registerMapSOCZero])
const obcRegisters = Observable.from([registerMapOBC])
const obcFalseRegisters = Observable.from([registerMapOBCFalse])

const socOBCRegisters = Observable.from([registerMapSOC, registerMapOBC])

const obcSOCRegisters = Observable.from([registerMapOBC, registerMapSOC])

let battery
describe('Battery', () => {
    it('Should return Observable', () => {
        battery = Battery({
            registers: socRegisters
        })
        assert.instanceOf(battery, Observable)
    })
    it('Should return soc', done => {
        battery = Battery({
            registers: socRegisters
        })
        const sub = battery
            .subscribe(batt => {
                assert.equal(batt.soc, 50)
                done()
            })
    })
    it('Should return soc of 0', done => {
        battery = Battery({
            registers: socZeroRegisters
        })
        const sub = battery
            .subscribe(batt => {
                assert.equal(batt.soc, 0)
                done()
            })
    })
    it('Should return charging status', done => {

        battery = Battery({
            registers: obcRegisters
        })
        const sub = battery
            .subscribe(batt => {
                assert.equal(batt.charging, true)
                done()
            })
    })
    it('Should return charging status of false', done => {

        battery = Battery({
            registers: obcFalseRegisters
        })
        const sub = battery
            .subscribe(batt => {
                assert.equal(batt.charging, false)
                done()
            })
    })
    it('Should return soc of 50 after obc register', done => {

        battery = Battery({
            registers: socOBCRegisters
        })
        const sub = battery
            .skip(1)
            .subscribe(batt => {
                assert.equal(batt.charging, true)
                assert.equal(batt.soc, 50)
                done()
            })
    })
    it('Should return soc of 50 after obc register', done => {

        battery = Battery({
            registers: obcSOCRegisters
        })
        const sub = battery
            .skip(1)
            .subscribe(batt => {
                assert.equal(batt.charging, true)
                assert.equal(batt.soc, 50)
                done()
            })
    })
})