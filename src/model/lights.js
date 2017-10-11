import { Observable } from 'rxjs'
import codes from '../data/codes'

const lightsRegisters = registers => registers.has(codes.KO_WF_LAMP_STATUS_INFO_REP_EVR)
const enabled = registers => registers.get(codes.KO_WF_LAMP_STATUS_INFO_REP_EVR) 
    ? registers.get(codes.KO_WF_LAMP_STATUS_INFO_REP_EVR)[0] === 1 : undefined

const lightsBuilder = register => ({
    headLightsOn: enabled(register),
})
const Lights = ({ registers, lights = {} }) => 
    registers
        .filter(lightsRegisters)
        .scan((lights, register) => lightsBuilder(register), lights)
        .map(update => _.merge(lights,update)) 

export default Lights