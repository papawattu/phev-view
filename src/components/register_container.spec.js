import chai from 'chai';
import sinon from 'sinon';
import RegisterContainer from './register_container';
import { Map, List, fromJS } from 'immutable';
import pretty from 'pretty';
import { JSDOM } from 'jsdom'

const assert = chai.assert;

const { document } = new JSDOM().window;


describe('Register Container', () => {

    it('Should bootstrap', () => {
        const registers = {
            1: [0],
            2: [0, 1, 2, 3]
        };
        const map = fromJS(registers);

        const sut = RegisterContainer({ document, registers: map });
        assert.isNotNull(sut);
    });
    it('Should return a table', () => {
        const registers = {
            1: [0],
            2: [0, 1, 2, 3]
        };
        const map = fromJS(registers);
        const html = '<table><thead><tr><th>Register</th><th>Data</th></tr></thead><tbody><tr><td>1</td><td>0</td></tr><tr><td>2</td><td>0</td><td>1</td><td>2</td><td>3</td></tr></tbody></table>'

        const sut = RegisterContainer({ document, registers: map });
        assert.equal(sut.outerHTML, html);
    });
    it('Should handle empty registers', () => {
        const registers = {
        };
        const html = '<table><thead><tr><th>Register</th><th>Data</th></tr></thead><tbody></tbody></table>'

        const map = fromJS(registers);

        const sut = RegisterContainer({ document, registers: map });
        assert.equal(sut.outerHTML, html);
    });
    it('Should handle empty data', () => {
        const registers = {
            1: [],
        };
        const html = '<table><thead><tr><th>Register</th><th>Data</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>'
 
        const map = fromJS(registers);

        const sut = RegisterContainer({ document, registers: map });
        assert.equal(sut.outerHTML, html);
    });
    it('Should show registers in hex', () => {
        const registers = {
            16: [0],
        };
        const html = '<table><thead><tr><th>Register</th><th>Data</th></tr></thead><tbody><tr><td>10</td><td>0</td></tr></tbody></table>'

        const map = fromJS(registers);

        const sut = RegisterContainer({ document, registers: map });
        assert.equal(sut.outerHTML, html);
    });
    it('Should show data in hex', () => {
        const registers = {
            16: [255],
        };
        const html = '<table><thead><tr><th>Register</th><th>Data</th></tr></thead><tbody><tr><td>10</td><td>ff</td></tr></tbody></table>'

        const map = fromJS(registers);

        const sut = RegisterContainer({ document, registers: map });
        assert.equal(sut.outerHTML, html);
    });
});