import Battery from './battery'
import AirCon from './aircon'
import Lights from './lights'

const DataHandlers = () => [
    ['battery', Battery],
    ['airCon', AirCon],
    ['lights', Lights]
]

export default DataHandlers