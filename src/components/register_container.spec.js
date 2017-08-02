import chai from 'chai';
import sinon from 'sinon';
import registerContainer from './register_container';
import { Map, List, fromJS } from 'immutable';
import pretty from 'pretty';
import { JSDOM } from 'jsdom'

const assert = chai.assert;

const { document } = new JSDOM().window;

const labels = {};
const registers = {};

labels.subscribe = sinon.stub();
labels.subscribe.returns({KO_WF_CHG_GUN_STATUS_EVR: 2})
    
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
        assert(sut.outerHTML.includes('<td>1</td>'));
    });
    it('Should show register label', () => {
        const data = {
            2: [0],
        };
        const registers = fromJS(data);

        const labels = {
            KO_WF_CHG_GUN_STATUS_EVR: 2
        }
        const sut = registerContainer({ document, registers, labels });
        console.log(sut.outerHTML);
        assert(sut.outerHTML.includes('KO_WF_CHG_GUN_STATUS_EVR'));
    });
    it('Should show data in hex', () => {
        const data = {
            16: [255],
        };
        const registers = fromJS(data);

        const sut = registerContainer({ document, registers, labels});
        assert(sut.outerHTML.includes('<td>ff</td>'));
    });
});