import chai from 'chai';
import sinon from 'sinon';
import { send, messages, subscribe, unsubscribe } from './mqtt_client'
import { sendMessage, receivedMessages, splitMessages, decodedMessages } from './car_service'

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
        const s = sub.subscribe(x => {
            assert.deepEqual(x, Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00,0x76]))
            s.unsubscribe()
            done()
        })

        send('phev/receive',Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00,0x76]))

    })
    it('Should receive split up messages',(done) => {
        const sub = splitMessages()
        let times = 0
        const s = sub.subscribe(x => {
            times ++
            if(times == 1) assert.deepEqual(x, Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00,0x76]))
            if(times == 2) {
                assert.deepEqual(x, Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00,0x78]))
                done()
            }
        })

        send('phev/receive',Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00,0x76,0xf6,0x05,0x00,0x01,0x01,0x00,0x78]))

    })
    it('Should receive decoded messages',(done) => {
        const sub = decodedMessages()
        const s = sub.subscribe(x => {
            assert.deepEqual(x,  
                { 
                    command: 0xf6,
                    length: 5,
                    type: 0,
                    register: 1,
                    data: Buffer.from([1,0]),
                    checksum : 0x76
                })
            done()
        })

        send('phev/receive',Buffer.from([0xf6,0x05,0x00,0x01,0x01,0x00,0x76,0xf6,0x05,0x00,0x01,0x01,0x00,0x78]))

    })
})