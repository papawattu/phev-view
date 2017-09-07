import React from 'react'

import BatteryView from './battery_view'
import RegisterView from './register_view'

const RefreshButton = props => <button onClick={props.updateClick} className="btn btn-primary"><span className="glyphicon glyphicon-refresh"></span></button>
const AirConButton = props => <button onClick={props.airConClick} className="btn btn-default">Air Conditioning</button>
const HeadLightsButton = props => <button onClick={props.headLightClick} className="btn btn-default">Head Lights</button>
const ParkLightsButton = props => <button onClick={props.parkLightClick} className="btn btn-default"><span className="glyphicon glyphicon-lightbulb"></span>Parking Lights</button>


class PhevView extends React.Component {

    constructor(props) {
        super(props)
        this.data = props.data
        this.operations = props.operations
        
    }
   render() {
        const data = this.data
        const operations = this.operations
        
        return <div className="col-md-12">
            <div className="row">
                <div>
                <h1>Phev View</h1>
                <BatteryView data={data}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <RefreshButton updateClick={operations.update}/>
                </div>
                <div className="col-md-3">
                    <AirConButton airConClick={operations.airCon}/>
                </div>
                <div className="col-md-3">
                    <HeadLightsButton headLightClick={operations.headLights}/>
                </div>
                <div className="col-md-3">
                    <ParkLightsButton parkLightClick={operations.parkLights}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <br/>
                </div>
            </div>
            <div className="row"> 
                <RegisterView data={data}/>
            </div>
        </div>
    }

}
export default PhevView