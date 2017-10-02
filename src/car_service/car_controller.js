import { Observable } from 'rxjs'
import CarService from './car_service'
import Battery from '../model/battery'
import Registers from '../model/registers'
import { encode } from '../car_message/encoder_decoder'
import codes from '../ref_data/phev_codes'
import { log } from 'phev-utils'

const CarController = config => {

    const carService = CarService(config)

    const sendCommand = (command, value) => undefined
    const messages = carService.commandMessages()

    const registers = Registers({ messages: messages })

    const battery = Battery({ registers })

    const operations = {
        update: () => sendCommand(codes.KO_WF_EV_UPDATE_SP,3),
        airCon: () => sendCommand(codes.KO_WF_MANUAL_AC_ON_RQ_SP,2),
        headLights: () => sendCommand(codes.KO_WF_H_LAMP_CONT_SP),
        parkLights: () => sendCommand(codes.KO_WF_P_LAMP_CONT_SP),
    }
    return {
        commandMessages: carService.commandMessages(),
        data: ({ battery: battery, registers: registers }),
        operations: operations
    }
}

export default CarController