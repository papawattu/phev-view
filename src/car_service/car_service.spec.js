import chai from 'chai';
import sinon from 'sinon';
import { send, messages, subscribe, unsubscribe } from './mqtt_client'
import { sendMessage, receivedMessages } from './car_service'

const assert = chai.assert;

describe('Car service',() => {
    it('Should send message',() => {

        const sub = messages('phev/send')
        subscribe('phev/send')

        const s = sub.subscribe(x => {
            assert.deepEqual(x.message,Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00]))
            s.unsubscribe()
            unsubscribe('phev/send')
        })
        sendMessage(Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00]))


    })
    it('Should receive message',(done) => {
        const sub = receivedMessages()
        sub.subscribe(x => {
            assert.deepEqual(x, Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00]))
            done()
        })

        send('phev/receive',Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00]))

    })
})