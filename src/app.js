import React from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rxjs'
import PhevView from './components/phev_view'
import Battery from './model/battery'
import Registers from './model/registers'
import CarController from './car_service/car_controller'
import config from './config'

export default class App {
    constructor(config) {
        const { data, operations } = CarController(config)

        ReactDOM.render((<div><PhevView data={data} operations={operations} /></div>),
            document.getElementById('root'))
    }
}