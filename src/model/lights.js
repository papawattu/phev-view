import { Observable } from 'rxjs'
import codes from '../data/codes'

const lightsRegisters = registers => registers.has(codes.KO_WF_LAMP_STATUS_INFO_REP_EVR) || registers.has(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR)
const headLightsEnabled = registers => registers.get(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR) 
    ? registers.get(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR)[9] === 1 : undefined
const parkingLightsEnabled = registers => registers.get(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR) && registers.get(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR) 
    ? registers.get(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR)[9] === 0 && registers.get(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR)[2] === 1: undefined

const lightsBuilder = register => ({
    headLightsOn: headLightsEnabled(register),
    parkingLightsOn: parkingLightsEnabled(register)
})
const Lights = ({ registers, lights = {} }) => 
    registers
        .filter(lightsRegisters)
        .scan((lights, register) => lightsBuilder(register), lights)
        .map(update => _.merge(lights,update)) 

export default Lights