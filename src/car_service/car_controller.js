import { Observable } from 'rxjs'
import CarService from './car_service'
import Battery from '../model/battery'
import Registers from '../model/registers'
import { encode } from '../car_message/encoder_decoder'
import codes from '../ref_data/phev_codes'
import { log } from 'phev-utils'

const CarController = ({ config }) => {

    const { 
        sendMessage, 
        sendSimpleCommand,
        sendDateSync,
        sendStartCommand,
        sendStopCommand,
        commandMessages,
        sendInit,
        sendFullCommand,
    } = CarService({ config })


    const responder = commandMessages()
        .subscribe(msg => {
            sendMessage(expectedResponse(msg))
        })

    const sendCommand = (command, value) => {
        sendSimpleCommand(command, value || 1)
    }

    const messages = commandMessages()

    const registers = Registers({ messages: messages })

    const battery = Battery({ registers })

    const dateSync = Observable.interval(30000)
        .subscribe(x => {
            sendDateSync(new Date())
        })

    const operations = {
        update      : () => sendCommand(codes.KO_WF_EV_UPDATE_SP, 3),
        airCon      : () => sendCommand(codes.KO_WF_MANUAL_AC_ON_RQ_SP, 2),
        headLights  : () => sendCommand(codes.KO_WF_H_LAMP_CONT_SP),
        parkLights  : () => sendCommand(codes.KO_WF_P_LAMP_CONT_SP),
        ecuFinished : () => sendCommand(codes.KO_WF_R_CUSTOM_SP, 0),
        doorLock    : () => sendCommand(codes.KO_WF_D_LOCK_RQ_SP, 1),
        custom      : (reg, val) => sendCommand(reg, val),
        connect     : sendStartCommand,
        disconnect  : sendStopCommand,
    }

    sendInit()

    return {
        commandMessages: commandMessages(),
        data: ({ battery: battery, registers: registers }),
        operations: operations
    }
}

export default CarController