
const config = {
    baseUri: process.env.PRODUCTION ? 'https://secure.wattu.com' : 'http://localhost:8081',
    firebase: {
        apiKey: 'AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE',
        authDomain: 'phev-db3fa.firebaseapp.com',
        databaseURL: 'https://phev-db3fa.firebaseio.com',
        projectId: 'phev-db3fa',
        storageBucket: 'phev-db3fa.appspot.com',
        messagingSenderId: '557258334399'
    }
}

export default config
