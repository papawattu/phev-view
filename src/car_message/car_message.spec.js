import chai from 'chai';
import sinon from 'sinon';
import { CarMessageHandler } from './car_message';

const assert = chai.assert;

const database = {};

const registers = {};

registers.set = sinon.stub();

database.ref = sinon.stub();
database.ref.child = sinon.stub().returns(registers);

const mqtt = {};
const client = {};
client.subscribe = sinon.stub();
mqtt.connect = sinon.stub().returns(client);


const config = { mqtt };

const sut = new CarMessageHandler(config);

describe('Car Message',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
    it('Should connect',() => {
        assert(mqtt.connect.calledOnce);
        assert(mqtt.connect.calledWith('ws://jenkins.wattu.com:8080/mqtt'));       
    });
    it('Should subscribe',() => {
        assert(sut.client.subscribe.calledWith('phev/receive'));       
    });
});