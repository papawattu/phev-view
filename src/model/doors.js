import { Observable } from 'rxjs'
import codes from '../data/codes'

const doorsRegisters = registers => registers.has(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR)
const doorsLocked = registers => registers.get(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR)
    ? registers.get(codes.KO_WF_DOOR_STATUS_INFO_REP_EVR)[0] === 1 : undefined
const doorsBuilder = register => ({
    doorsLocked: doorsLocked(register),
})
const Doors = ({ registers, doors = {} }) =>
    registers
        .filter(doorsRegisters)
        .scan((doors, register) => doorsBuilder(register), doors)
        .map(update => _.merge(doors, update))

export default Doors