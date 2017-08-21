import chai from 'chai';
import sinon from 'sinon';
import { subscribe, send, messages, unsubscribe } from './mqtt_client';

const assert = chai.assert;


describe('mqtt wrapper', () => {
    
    it('Should send and receive buffer', (done) => {
        
        subscribe('test')
        const sub = messages('test').subscribe(x => {
            assert.deepEqual(x.message,Buffer.from([0,1,2,3,4]),'expected Buffer[0,1,2,3,4] got ' + x)
            sub.unsubscribe();
            unsubscribe('test')
            done()
        })
        send('test',Buffer.from([0,1,2,3,4]))
    })
})