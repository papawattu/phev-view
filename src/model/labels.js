import Rx from 'rxjs/Rx';
import Immutable from 'immutable';

const labels = ({ database }) => {
    return Rx.Observable
        .fromEvent(database().ref('/codes/'), 'value')
        .map(e => e.val());
}

const responseLabels = ({ database }) => {
    return Rx.Observable
        .fromEvent(database().ref('/codes/'), 'value')
        .map(e => e.val())
        .map(x => {
            return Object.assign(...Object.keys(x)
                .filter(z => z.includes('_EVR', z.length - 4) && z.startsWith('KO_WF_'))
                .map(y => ({ [y]: x[y] })));
        });
}
export { labels, responseLabels };