import chai from 'chai';
import sinon from 'sinon';
import CarData from './car_data';

const assert = chai.assert;

const database = {};

const registers = {};

registers.set = sinon.stub();

database.ref = sinon.stub();
database.ref.child = sinon.stub().returns(registers);


const config = { database };

const sut = new CarData(config);

describe('Car Data',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
    it('Should update',() => {
        
        sut.update(0x11,0xff);
        assert(database.ref.child.withArgs('registers').calledOnce,'database ref should be called');
        assert(registers.set.withArgs({register : 0x11, value : 0xff}).calledOnce,'set should be called with reg 0x11 and val 0xff');
        
    });
});