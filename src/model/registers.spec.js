import chai from 'chai';
import sinon from 'sinon';
import { registers } from './registers';
import database from '../database';

const assert = chai.assert;

//const database = {}
const sut = registers({database});

describe('Register',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
});