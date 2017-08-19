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
            console.log(message)
            assert.equal(message)
            console.log(props.sendToQueue.calledWith(message));
            assert(props.sendToQueue.withArgs(new Buffer.from([0xf9])))
            sub.unsubscribe()
            done()
        })
    })
})