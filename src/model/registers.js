import Rx from 'rxjs/Rx';
import Immutable from 'immutable';

const Registers = ({ database }) => {

    const ref = database().ref('/registers/');

    const registers = Rx.Observable.fromEvent(ref, 'value')
        .scan((state, value) => state.set('registers',
            Immutable.fromJS(
                Object.assign(...Object.keys(value.val()).map(e => ({ [e]: value.val()[e].data })))))
        , Immutable.fromJS({}));
    return registers;
}

export default Registers;
