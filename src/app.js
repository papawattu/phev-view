import React from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rxjs'
import PhevView from './components/phev_view'
import Battery from './model/battery'
import Registers from './model/registers'
import CarController from './car-service/car-controller'
import CarService from './car-service/car-service'
import config from './config'
import DataHandlers from './model'
import { Observable } from 'rxjs'

export default class App {
    constructor({config, firebase}) {
        firebase.initializeApp(config.firebase)
        
        const carService = CarService({config, firebase})
        const dataHandlers = DataHandlers()
        const { data, operations } = CarController({config, carService, dataHandlers})

        ReactDOM.render((<div><PhevView data={data} operations={operations} /></div>),
            document.getElementById('root'))
    }
}