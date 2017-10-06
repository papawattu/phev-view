import { Observable } from 'rxjs'
import codes from '../data/codes'
import _ from 'lodash'

const timeRemain = remain => {
    const data = Int16Array.from(remain)
    const high = data[1]
    const low = data[2]

    return ((low < 0 ? low + 0x100 : low) * 0x100)
        + (high < 0 ? high + 0x100 : high)

}
const Battery = ({ registers }) => registers
        .filter(reg => reg.has(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR) || reg.has(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR))
        .scan((battery,regs) => {
            battery.soc = regs.get(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR) 
                ? regs.get(codes.KO_WF_BATT_LEVEL_INFO_REP_EVR)[0] || 0 : 0
            battery.charging = regs.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR) ? 
                regs.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)[0] === 1
                : false
            battery.remaining = regs.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR) ?
                regs.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)[2] != 0xff   
                ? timeRemain(regs.get(codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)) : 0 : 0
            battery.chargeType = 'regular'
            return battery
        },{})

export default Battery