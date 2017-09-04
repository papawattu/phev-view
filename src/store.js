import Rx from 'rxjs/Rx';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE",
    authDomain: "phev-db3fa.firebaseapp.com",
    databaseURL: "https://phev-db3fa.firebaseio.com",
    projectId: "phev-db3fa",
    storageBucket: "phev-db3fa.appspot.com",
    messagingSenderId: "557258334399"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

if (process.env.NODE_ENV === 'production') {
    const registers$ = Rx.Observable.fromEvent(firebase.database().ref('/registers/'), 'value');
    const labels$ = Rx.Observable.fromEvent(firebase.database().ref('/codes/'), 'value');

} else {
    const registers$ = Rx.Observable.from({});
    const labels$ = Rx.Observable.from({});

}

export { registers$ as $register, labels$ as $labels };

export default firebase.database;