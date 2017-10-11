import { Observable } from 'rxjs'
import codes from '../data/codes'

const airConRegisters = registers => registers.has(codes.KO_AC_MANUAL_SW_EVR)
const enabled = registers => registers.get(codes.KO_AC_MANUAL_SW_EVR) ? registers.get(codes.KO_AC_MANUAL_SW_EVR)[1] === 1 : undefined

const airConBuilder = register => ({
    enabled: enabled(register),
})
const AirCon = ({ registers, airCon = {} }) => 
    registers
        .filter(airConRegisters)
        .scan((airCon, register) => airConBuilder(register), airCon)
        .map(AC => _.merge(airCon,AC)) 

export default AirCon