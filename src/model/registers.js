import Rx from 'rxjs/Rx';
import Immutable from 'immutable';

const registers = ({ database }) => {
    return Rx.Observable
        .fromEvent(database().ref('/registers/'), 'value')
        .scan((state, value) => Immutable.fromJS(
            Object.assign(...Object.keys(value.val()).map(e => ({
                [e]: value.val()[e].data
            })))), Immutable.fromJS({}));
}

export { registers };