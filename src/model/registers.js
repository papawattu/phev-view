import Rx from 'rxjs/Rx';
import Immutable from 'immutable';

const Registers = ({ database }) => {
    const registers = Rx.Observable
        .fromEvent(database().ref('/registers/'), 'value')
        .scan((state, value) => Immutable.fromJS(
            Object.assign(...Object.keys(value.val()).map(e => ({
                [e]: value.val()[e].data
            })))), Immutable.fromJS({}));
    return registers;
}

export default Registers;