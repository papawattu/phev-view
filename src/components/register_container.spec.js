import chai from 'chai';
import sinon from 'sinon';
import RegisterContainer from './register_container';

const assert = chai.assert;

const document = {};

document.createElement = sinon.stub().returns({ tagName: 'div' });

const sut = RegisterContainer(document);

describe.skip('Register Container', () => {
    it('Should bootstrap', () => {
        assert.isNotNull(sut);
    });
    it('Should return a div', () => {
        assert.equal(sut.render().tagName, 'div');
    });
});