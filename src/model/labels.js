import Rx from 'rxjs/Rx';
import Immutable from 'immutable';
import { $labels } from '../database';

const labels = () => {
    return Rx.Observable
        .from($labels)
        .map(e => e.val());
}

const responseLabels = () => {
    return Rx.Observable
        .from(labels())
        .map(x => Object.assign(...Object.keys(x)
                .filter(z => z.includes('_EVR', z.length - 4))
                .map(y => ({ [y]: x[y] }))));
}
export { labels, responseLabels };