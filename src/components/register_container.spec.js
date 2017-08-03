import chai from 'chai';
import sinon from 'sinon';
import registerContainer from './register_container';
import { Map, List, fromJS } from 'immutable';
import pretty from 'pretty';
import { JSDOM } from 'jsdom'

const assert = chai.assert;

const { document } = new JSDOM().window;

const labels = {KO_WF_CHG_GUN_STATUS_EVR: 2,KO_WF_OPTION_HTR_PRSNT_EVR: 1};
const registers = {};

describe('Register Container', () => {

    it('Should bootstrap', () => {
        const data = {
            1: [0],
            2: [0, 1, 2, 3]
        };
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels });
        assert.isNotNull(sut);
    });
    it('Should return a table', () => {
        const data = {
            1: [0],
            2: [0, 1, 2, 3]
        };

        const registers = fromJS(data);
    
        const sut = registerContainer({ document, registers, labels});
        assert(sut.outerHTML.includes('<table>'));
        assert(sut.outerHTML.includes('</table>'));
    });
    it('Should have Register title', () => {
        const data = {
        };
        
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels });
        assert(sut.outerHTML.includes('<th>Register</th>'));
    });
    it('Should have Data title', () => {
        const data = {
        };
        
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels });
        assert(sut.outerHTML.includes('<th>Data</th>'));
    });
    it('Should have Text title', () => {
        const data = {
        };
        
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels });
        console.log(sut.outerHTML);
        assert(sut.outerHTML.includes('<th>Text</th>'));
    });
    it('Should handle empty registers', () => {
        const data = {
        };
        
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels });
        assert(sut.outerHTML.includes('<tbody></tbody>'));
    });
    it('Should handle empty data', () => {
        const data = {
            1: [],
        };
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels });
        assert(sut.outerHTML.includes('<td>KO_WF_OPTION_HTR_PRSNT_EVR</td>'));
    });
    it('Should show register label', () => {
        const data = {
            1: [0],
        };
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels });
        assert(sut.outerHTML.includes('KO_WF_OPTION_HTR_PRSNT_EVR'));
    });
    it('Should show data in hex', () => {
        const data = {
            1: [255],
        };
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels});;
        assert(sut.outerHTML.includes('<td>0xff</td>'));
    });
});