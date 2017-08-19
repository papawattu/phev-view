import chai from 'chai';
import sinon from 'sinon';
import { client, sendToQueue, observeQueue } from './mqtt_helpers';

const assert = chai.assert;

const mqtt = {}
const cl = {}
const mqttUri = '' 
const sendTopic = ''
cl.publish = sinon.stub()
mqtt.connect = sinon.stub().returns(cl)

const sut = client({mqtt, mqttUri})

describe('client',() => {
    it('Should return client',() => {
        assert.equal(client({mqtt, mqttUri}),cl)
    })
    it('Should connect with correct uri',() => {
        assert(mqtt.connect.calledWith(mqttUri))
    })
})
describe('sendQueue',() => {
    it('Should send message to queue',() => {
        const message = {}

        sendToQueue({message, mqtt, mqttUri, sendTopic})
        assert(cl.publish.calledWith(sendTopic,message))
    })
})
describe('sendQueue',() => {
    it('Should subsribe to queue',(done) => {
        const message = {}

        observeQueue.subscribe(message => {
            
            done();
        })
    })
})