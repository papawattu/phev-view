import chai from 'chai'
import sinon from 'sinon'
import Registers from './registers'

const assert = chai.assert

const messages = {}
messages.filter = sinon.stub().returnsThis()
messages.scan = sinon.stub().returnsThis()
const sut = Registers({ messages })

describe.skip('Register',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    })
    it('Should allow valid objects thorugh filter', done => {
        messages.subscribe = sinon.stub().yields({ register: 1, data: Buffer.from([0])})        
        
        sut.subscribe(x => {
            assert.deepEqual(x, {register: 1, data: Buffer.from([0])})
            done()
        })
        messages.subscribe.reset()
        
    })
})