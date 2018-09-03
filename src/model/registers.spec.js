import chai from 'chai'
import sinon from 'sinon'
import { Observable } from 'rxjs'
import Registers from './registers'

const assert = chai.assert

const messages = Observable.from([{ register: 1, data: Buffer.from([0])}])
const sut = Registers({ messages })

describe('Register',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    })
    it('Should return a map of registers', done => {
        sut.subscribe(x => {
            assert.isNotNull(x)
            assert.deepEqual(x.get(1), Buffer.from([0]))
            done()
        })
    })
})