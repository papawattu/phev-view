import chai from 'chai';
import sinon from 'sinon';
import App2 from './app2';

const assert = chai.assert;

const document = {};

document.addEventListener = sinon.stub();

const sut = App2(document);

describe('App',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
});