import chai from 'chai';
import sinon from 'sinon';
import database from './database';

const assert = chai.assert;

const document = {};

document.addEventListener = sinon.stub();

describe('Database',() => {
    it('Should bootstrap',(done) => {

        database().ref('/registers/').once('value',value => {
            assert.isObject(value);
            done();
        });
    });
});
