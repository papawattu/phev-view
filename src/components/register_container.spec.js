import chai from 'chai';
import sinon from 'sinon';
import RegisterContainer from './register_container';
import {Map,List,fromJS} from 'immutable';
import pretty from 'pretty';
import { JSDOM } from 'jsdom'

const assert = chai.assert;

const html = '<table><thead><tr><th>Register</th><th>Data</th></tr></thead><tbody><tr><td>1</td><td>0</td></tr><tr><td>2</td><td>0</td><td>1</td><td>2</td><td>3</td></tr></tbody></table>'

const { document } = new JSDOM().window;

const registers = {
    1: [0],
    2: [0,1,2,3]
};
const map = fromJS(registers);

describe('Register Container', () => {

    it('Should bootstrap', () => {
        const sut = RegisterContainer( { document, registers: map } );
        assert.isNotNull(sut);
    });
    it('Should return a table', () => {
        const sut = RegisterContainer( { document, registers: map } );
        assert.equal(sut.outerHTML, html);
    });

});