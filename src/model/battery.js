import {
    Observable
} from 'rxjs'
import codes from '../data/codes'
import _ from 'lodash'

const MAX_BYTE = 255
const timeRemain = remain => {
    const data = Int16Array.from(remain)
    const high = data[1]
    const low = data[2]

    return ((low < 0 ? low + 0x100 : low) * 0x100) +
        (high < 0 ? high + 0x100 : high)

}

const soc = register => register.get(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR) ?
    register.get(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR)[0] || 0 : undefined
const charging = register => register.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR) ?
    register.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)[0] === 1 :
    undefined
const remaining = register => register.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR) ?
    register.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)[2] != MAX_BYTE ?
    timeRemain(register.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)) : 0 : undefined
const batteryRegister = register => register.has(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR) ||
    register.has(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)

const chargeType = register => 'regular'

const batteryBuilder = register => ({
    soc: soc(register),
    charging: charging(register),
    remaining: remaining(register),
    chargeType: chargeType(register),
})

const Battery = ({
        registers,
        battery = {}
    }) => registers
    .filter(reg => batteryRegister(reg))
    .scan((batt, register) => batteryBuilder(register), battery)
    .map(batt => _.merge(battery,batt))

export default Battery