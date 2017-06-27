import chai from 'chai';
import sinon from 'sinon';
import CarMessage from './car_message';

const assert = chai.assert;

const database = {};

const registers = {};

registers.set = sinon.stub();

database.ref = sinon.stub();
database.ref.child = sinon.stub().returns(registers);

const mqtt = {};
mqtt.connect = sinon.stub();

const config = { mqtt };

const sut = new CarMessage(config);

describe('Car Message',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
    it('Should connect',(done) => {
        
        sut.connect(() => {
            done();
        });
        
    });
});