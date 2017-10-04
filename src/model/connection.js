import { Observable } from 'rxjs'
import { codes } from 'phev-utils'
import _ from 'lodash'

const Connection = ({ registers }) => console.log(registers.filter(x.register === codes.KO_WF_DATE_INFO_SYNC_EVR))