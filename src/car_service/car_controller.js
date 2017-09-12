import { Observable } from 'rxjs'
import CarService from './car_service'
import Battery from '../model/battery'
import Registers from '../model/registers'
import { encode } from '../car_message/encoder_decoder'
import codes from '../ref_data/phev_codes'
import { log } from 'phev-utils'

const CarController = ({ config }) => {

    const connectionSubscriptions = []

    const {
        sendMessage,
        sendSimpleCommand,
        sendDateSync,
        sendStartCommand,
        sendStopCommand,
        commandMessages,
        sendInit,
        sendFullCommand,
        startPing,
        expectedResponse,
        disconnect,
        connected,
    } = CarService({ config })

    const sendCommand = (command, value) => {
        sendSimpleCommand(command, value || 1)
    }

    const messages = commandMessages()

    const registers = Registers({ messages: messages })

    const battery = Battery({ registers })

    const keepAlive = () => {

        const pingSub = startPing(1000, 10000)
            .delay(8000)
            .subscribe(x => console.log('Ping ' + x),
                err => console.log(err),
                () => console.log('complete')    
            )

        const dateSync = Observable.interval(30000)
            .do(x => console.log('time sync ' + x))
            .subscribe(x => {
                sendDateSync(new Date())
            })

        return [ pingSub, dateSync ]
    }

    const connect = () => {
        log.info('Connecting')
        sendStartCommand()
        sendInit()
        
        
        const responder = commandMessages()
            .subscribe(msg => {
                sendMessage(expectedResponse(msg))
            })

        connectionSubscriptions.push(responder)
        
        connectionSubscriptions.push(...keepAlive())
    }
    const stop = () => {
        log.info('Disconnecting')
        sendStopCommand()
        connectionSubscriptions.map(sub => sub.unsubscribe())
    }

    const operations = {
        update: () => sendCommand(codes.KO_WF_EV_UPDATE_SP, 3),
        airCon: () => sendCommand(codes.KO_WF_MANUAL_AC_ON_RQ_SP, 2),
        headLights: () => sendCommand(codes.KO_WF_H_LAMP_CONT_SP),
        parkLights: () => sendCommand(codes.KO_WF_P_LAMP_CONT_SP),
        ecuFinished: () => sendCommand(codes.KO_WF_R_CUSTOM_SP, 0),
        doorLock: () => sendCommand(codes.KO_WF_D_LOCK_RQ_SP, 1),
        custom: (reg, val) => sendCommand(reg, val),
        connect: connect,
        disconnect: stop,
    }

    return {
        connect: connect,
        disconnect: disconnect,
        commandMessages: commandMessages(),
        data: ({
            battery: battery,
            registers: registers
        }),
        operations: operations
    }
}

export default CarController