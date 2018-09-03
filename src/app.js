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
import { GoogleLogin } from 'react-google-login'
import auth2 from './dev/auth'


export default class App {
    constructor({ config, auth, firebase }) {
        firebase.initializeApp(config.firebase)

        const carService = CarService({ config, auth, firebase })
        const dataHandlers = DataHandlers()
        const { data, operations } = CarController({ config, carService, dataHandlers })
        
        const responseGoogle = response => auth.setToken(response.tokenId)
        ReactDOM.render(
            <GoogleLogin
              clientId="557258334399-k6u903i01e5b6uksqjf3q4n41okocu5n.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />,
            document.getElementById('googleButton'))
        ReactDOM.render((<div><PhevView data={data} operations={operations} /></div>),
            document.getElementById('root'))
    }
    responseGoogle(response) {
        console.log(response)
    }
}