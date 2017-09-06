import { Observable } from 'rxjs'
import codes from '../ref_data/phev_codes'
import _ from 'lodash'

const timeRemain = remain => {
    const data = Int16Array.from(remain)
    const high = data[1]
    const low = data[2]

    return ((low < 0 ? low + 0x100 : low) * 0x100)
        + (high < 0 ? high + 0x100 : high)

}
const Battery = ({ registers }) => {
    const regs = registers.partition(x => x.register === codes.KO_WF_BATT_LEVEL_INFO_REP_EVR)
    const soc = regs[0]
        .map(x => x.data[0])
        .map(x => (
            { 
                battery: 
                    { 
                        soc: x 
                    } 
                }
            )
        )
    const charging = regs[1]
        .filter(x => x.register === codes.KO_WF_OBCHG_OK_ON_INFO_REP_EVR)
        .map(x => (
            {
                battery: {
                    charging: x.data[0] == 1 ? true : false,
                    remaining: timeRemain(x.data),
                    chargeType: 'regular'
                }
            }
        ))
    const battery = Observable.combineLatest(soc,charging)
        .map(x => _.merge(x[0],x[1]))
        .do(x => console.log('::' + JSON.stringify(x)))    
    return battery
}

export default Battery