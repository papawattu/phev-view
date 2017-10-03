import { Observable } from 'rxjs'
import CarService from './car_service'
import Battery from '../model/battery'
import AirCon from '../model/aircon'
import Registers from '../model/registers'
import { encode } from '../car_message/encoder_decoder'
import codes from '../ref_data/phev_codes'
import { log } from 'phev-utils'

const CarController = config => {

    const carService = CarService(config)


    const sendCommand = (register, value) => carService.sendMessage({register, value: value || 1})

    const messages = carService.commandMessages()

    const registers = Registers({ messages: messages })

    const battery = Battery({ registers })

    const airCon = AirCon({ registers })

    const operations = {
        update: () => sendCommand(codes.KO_WF_EV_UPDATE_SP, 3),
        airCon: () => sendCommand(codes.KO_WF_MANUAL_AC_ON_RQ_SP, 2),
        headLights: () => sendCommand(codes.KO_WF_H_LAMP_CONT_SP),
        parkLights: () => sendCommand(codes.KO_WF_P_LAMP_CONT_SP),
    }
    return {
        commandMessages: carService.commandMessages(),
        data: ({ battery, registers, airCon }),
        operations: operations
    }
}

export default CarController