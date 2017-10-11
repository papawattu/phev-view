import { Observable } from 'rxjs'
import Battery from '../model/battery'
import AirCon from '../model/aircon'
import Registers from '../model/registers'
import codes from '../data/codes'
import { log } from 'phev-utils'

const CarController = ({ config, carService, dataHandlers }) => {
    
    const sendCommand = (register, value) => carService.sendMessage({register, value: value || 1})

    const messages = carService.commandMessages()

    const registers = Registers({ messages })

    const operations = {
        update: () => sendCommand(codes.KO_WF_EV_UPDATE_SP, 3),
        airCon: () => sendCommand(codes.KO_WF_MANUAL_AC_ON_RQ_SP, 2),
        headLights: () => sendCommand(codes.KO_WF_H_LAMP_CONT_SP),
        parkLights: () => sendCommand(codes.KO_WF_P_LAMP_CONT_SP),
        sendCommand
    }

    const data = dataHandlers
        .map((handler) => [handler[0],handler[1]({ registers })])
        .reduce((cur, handler) => 
            {
                cur[handler[0]] = handler[1]
                return cur
            },{})
        
    data.registers = registers

    return {
        data,
        operations
    }
}

export default CarController