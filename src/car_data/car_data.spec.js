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

const sut = new CarDataStore(config);

describe('Car Data',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
    it('Should update',() => {
        
        sut.update({register: 0x11, value : 0xff});
        assert(database.ref.child.calledWith('registers'),'database ref should be called');
        assert(registers.set.calledWith(sinon.match({register : 0x11,value : 0xff})),'set should be called with reg 0x11 and val 0xff');
        
    });
});