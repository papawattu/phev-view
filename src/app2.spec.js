import chai from 'chai';
import App2 from './app2';

const assert = chai.assert;

const sut = App2();

describe('App',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
});