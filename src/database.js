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

export default firebase.database;;