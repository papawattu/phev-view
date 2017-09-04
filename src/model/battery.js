const KO_WF_BATT_LEVEL_INFO_REP_EVR = 29
const KO_WF_FULL_CHG_STAT_EVR = 14

const Battery = ({ registers }) => registers
    .filter(x => { 
        switch(x.register) {
            case KO_WF_BATT_LEVEL_INFO_REP_EVR : return true ; break
            case KO_WF_FULL_CHG_STAT_EVR : return true ; break
            default : return false 
        }
    })
    .map(x => x.data[0])
    .filter(x => x < 0x64)
    .map(x => ({ battery : { soc : x, charging: true, chargeType: 'regular'}}))
    
export default Battery
