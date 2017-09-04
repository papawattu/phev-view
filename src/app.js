import React from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rxjs'
import PhevView from './components/phev_view'
import Battery from './model/battery'
import Registers from './model/registers'
import CarController from './car_service/car_controller'

export default class App {
    constructor({ messages } = {}) {
        const { data, operations } = CarController({ messages })

        ReactDOM.render((<div className='container-fluid'><PhevView data={data} operations={operations} /></div>),
            document.getElementById('root'))
    }
}
