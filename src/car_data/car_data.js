import * as firebase from 'firebase';


export default class CarDataStore {
    constructor({ database } = {}) {
        const config = {
            apiKey: "AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE",
            authDomain: "phev-db3fa.firebaseapp.com",
            databaseURL: "https://phev-db3fa.firebaseio.com",
            projectId: "phev-db3fa",
            storageBucket: "phev-db3fa.appspot.com",
            messagingSenderId: "557258334399"
        };

        if(!database) {
            firebase.initializeApp(config);
            this.database = firebase.database;
        } else {
            this.database = database;
        }
    }
    update({ register, value }) {
        const registers = this.database.ref.child('registers');

        registers.set({ register: register, value: value });
    }
}