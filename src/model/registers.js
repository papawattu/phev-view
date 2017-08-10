import Rx from 'rxjs/Rx';
import Immutable from 'immutable';
import { $register } from '../database';

const registers = ({ database }) => {
    return Rx.Observable
        .from($register)
        .scan((state, value) => Immutable.fromJS(
            Object.assign(...Object.keys(value.val()).map(e => ({
                [e]: value.val()[e].data
            })))), Immutable.fromJS({}));
}

export { registers };