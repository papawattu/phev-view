import chai from 'chai';
import sinon from 'sinon';
import { CarDataStore } from './car_data';

const assert = chai.assert;

const registers = {};

registers.set = sinon.stub();

const child2 = {};
child2.child = sinon.stub().returns(registers);
const child = {};
child.child = sinon.stub().returns(child2);
const database = sinon.stub();

const ref = {};
ref.ref = sinon.stub();
ref.ref.returns(child); 
database.returns(ref);

const config = { database };

const sut = CarDataStore(config);

describe('Car Data',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
    it('Should store',() => {
        
        const message = {register: 0x11, data : Buffer.from([0xff])};
        assert.deepEqual(sut.store(message),message);
        assert(child.child.calledWith('registers'),'database ref should be called');
        assert(registers.set.calledWith(sinon.match({register : 0x11,data : {0: 0xff}})),'set should be called with reg 0x11 and val 0xff');
        
    });
});