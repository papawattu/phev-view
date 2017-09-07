import { Observable } from 'rxjs'
import CarService from './car_service'
import Battery from '../model/battery'
import Registers from '../model/registers'
import { encode } from '../car_message/encoder_decoder'
import codes from '../ref_data/phev_codes'
import log from '../utils/logger'

const CarController = (config) => {

    const carService = CarService(config)

    const responder = carService.commandMessages()
        .subscribe(msg => {
            carService.sendMessage(carService.expectedResponse(msg))
        })
    const sendCommand = (command, value) => {
        carService.sendSimpleCommand(command, value || 1)
    }
    const messages = carService.commandMessages()

    const registers = Registers({ messages: messages })

    const battery = Battery({ registers })

    const dateSync = Observable.interval(30000)
        .subscribe(x => {
            carService.sendDateSync(new Date())
        })

    const operations = {
        update: () => sendCommand(codes.KO_WF_EV_UPDATE_SP,3),
        airCon: () => sendCommand(codes.KO_WF_MANUAL_AC_ON_RQ_SP,2),
        headLights: () => sendCommand(codes.KO_WF_H_LAMP_CONT_SP),
        parkLights: () => sendCommand(codes.KO_WF_P_LAMP_CONT_SP),
    }
    carService.sendInit()
    return {
        commandMessages: carService.commandMessages(),
        data: ({ battery: battery, registers: registers }),
        operations: operations
    }
}

export default CarController