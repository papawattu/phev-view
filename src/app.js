import React from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rxjs'
import PhevView from './components/phev_view'
import Battery from './model/battery'
import Registers from './model/registers'
import CarController from './car_service/car_controller'
import config from './config'
import firebase from 'firebase'

export default class App {
    constructor({config, firebase = firebase}) {
        firebase.initializeApp({
            apiKey: 'AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE',
            authDomain: 'phev-db3fa.firebaseapp.com',
            databaseURL: 'https://phev-db3fa.firebaseio.com',
            projectId: 'phev-db3fa',
            storageBucket: 'phev-db3fa.appspot.com',
            messagingSenderId: '557258334399'
        })
        
        const carService = CarService({config, firebase})
        const { data, operations } = CarController({config, carService})

        ReactDOM.render((<div><PhevView data={data} operations={operations} /></div>),
            document.getElementById('root'))
    }
}