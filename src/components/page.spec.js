import chai from 'chai';
import sinon from 'sinon';
import Page from './page';

const assert = chai.assert;

const sut = Page('PHEV View');


describe('Page',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
});