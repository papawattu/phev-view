import Battery from './battery'
import AirCon from './aircon'
import Lights from './lights'
import Doors from './doors'

const DataHandlers = () => [
    ['battery', Battery],
    ['airCon', AirCon],
    ['lights', Lights],
    ['doors', Doors]
]

export default DataHandlers