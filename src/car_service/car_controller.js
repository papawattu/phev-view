import { Observable } from 'rxjs'
import * as CarService from './car_service'
import Battery from '../model/battery'
import Registers from '../model/registers'
import { encode } from '../car_message/encoder_decoder'
import codes from '../ref_data/phev_codes'


const KO_WF_EV_UPDATE_SP = codes.KO_WF_EV_UPDATE_SP
const KO_WF_H_LAMP_CONT_SP = codes.KO_WF_H_LAMP_CONT_SP
const KO_WF_MANUAL_AC_ON_RQ_SP = codes.KO_WF_MANUAL_AC_ON_RQ_SP

const CarController = ({ messages }) => {
    const pingSub = CarService.startPing(1000, 5000)
        .subscribe(x => {
            console.log('retry failure' + JSON.stringify(x))
            x.subscribe(y => console.log('+++' + y), err => {
                console.log('Error1 ' + err)
                pingSub.unsubscribe()
            })
        })
    CarService.commandMessages().subscribe(msg => {
      //  console.log(`<< ${msg.register} : ${msg.data.map(x => ' ' + x.toString(16))}`)
        CarService.sendMessage(encode(CarService.expectedResponse(msg)))
    })
    const sendCommand = command => {
        CarService.sendSimpleCommand(command, 1)
    }
    const source = CarService.commandMessages()

    const registers = Registers({ source: source })

    const battery = Battery({ registers })

    const operations = {
        update: () => sendCommand(KO_WF_EV_UPDATE_SP),
        airCon: () => sendCommand(KO_WF_MANUAL_AC_ON_RQ_SP),
        headLights: () => sendCommand(KO_WF_H_LAMP_CONT_SP),
    }

    return {
        commandMessages: messages || CarService.commandMessages(),
        sendCommand: sendCommand,
        data: ({ battery: battery, registers : registers }),
        operations: operations 
    }
}


export default CarController