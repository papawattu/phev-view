import chai from 'chai';
import sinon from 'sinon';
import { pingPong } from './car_service';

const assert = chai.assert;

const props = {}

props.sendToQueue = sinon.stub().returnsArg(1)
props.interval = 1000

const sut = pingPong(props)

describe('PingPong',() => {
    it('Should ping',(done) => {
        const sub = sut.subscribe(message => {
            assert.deepEqual(message,new Buffer.from([0xf9,0x04,0x00,0x00,0x00,0xfd]))
            sub.unsubscribe()
            done()
        })
    })
})