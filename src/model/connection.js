import { Observable } from 'rxjs'
import { codes } from 'phev-utils'
import _ from 'lodash'
/*
const Connection = ({ registers }) => {
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
*/