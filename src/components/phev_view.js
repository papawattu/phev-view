import React from 'react'

import BatteryView from './battery_view'
import RegisterView from './register_view'

const RefreshButton = props => <button onClick={props.updateClick} className="btn btn-default">Refresh</button>
const AirConButton = props => <button onClick={props.airConClick} className="btn btn-default">Air Conditioning</button>
const HeadLightsButton = props => <button onClick={props.headLightClick} className="btn btn-defeult">Head Lights</button>
const ParkLightsButton = props => <button onClick={props.parkLightClick} className="btn btn-defeult">Parking Lights</button>


class PhevView extends React.Component {

    constructor(props) {
        super(props)
        this.data = props.data
        this.operations = props.operations
        
    }
   render() {
        const data = this.data
        const operations = this.operations
        
        return <div>
            <BatteryView data={data}/>
            <RefreshButton updateClick={operations.update}/>
            <AirConButton airConClick={operations.airCon}/>
            <HeadLightsButton headLightClick={operations.headLights}/>
            <ParkLightsButton parkLightClick={operations.parkLights}/>
            <RegisterView data={data}/>
        </div>
    }

}
export default PhevView