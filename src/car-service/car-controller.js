import { Observable } from 'rxjs'
import Battery from '../model/battery'
import AirCon from '../model/aircon'
import Registers from '../model/registers'
import codes from '../data/codes'
import { log } from 'phev-utils'

const CarController = ({ config, carService, dataHandlers }) => {

    const sendCommand = message => {
        return carService.sendMessage({ state : message } )
    }
    
    const messages = carService.commandMessages()

    const registers = Registers({ messages })

    const operations = {
        update: () => sendCommand({ update : true }),
        airCon: enabled => sendCommand({ airConOn : enabled }),
        headLights: enabled => sendCommand({ headLightsOn : enabled }),
        parkLights: enabled => sendCommand({ parkLightsOn : enabled }),
        sendCommand
    }

    const data = dataHandlers
        .map((handler) => [handler[0], handler[1]({ registers })])
        .reduce((cur, handler) => {
            cur[handler[0]] = handler[1]
            return cur
        }, {})

    data.registers = registers

    return {
        data,
        operations
    }
}

export default CarController