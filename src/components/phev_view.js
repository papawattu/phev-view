import React from 'react'

import BatteryView from './battery_view'
import RegisterView from './register_view'

const RefreshButton = props => <button onClick={props.updateClick} className="btn btn-primary"><span className="glyphicon glyphicon-refresh"></span></button>
const AirConButton = props => <button onClick={props.airConClick} className="btn btn-default">Air Conditioning</button>
const HeadLightsButton = props => <button onClick={props.headLightClick} className="btn btn-default">Head Lights</button>
const ParkLightsButton = props => <button onClick={props.parkLightClick} className="btn btn-default"><span className="glyphicon glyphicon-lightbulb"></span>Parking Lights</button>
const HornButton = props => <button onClick={props.hornClick} className="btn btn-default"><span className="glyphicon glyphicon-lightbulb"></span>Horn</button>
const DoorLockButton = props => <button onClick={props.doorLockClick} className="btn btn-default"><span className="glyphicon glyphicon-lightbulb"></span>Door Lock</button>

class CustomCommand extends React.Component {
        
    constructor(props) {
        super(props)
        this.state = { register: 0, value: 0} 
        this.sendCommand = props.sendCommand
    }
 
    handleSend() {
        this.sendCommand(this.state.register,this.state.value)
    }
    handleRegChange(e) {
        this.setState({register : e.target.value, value : this.state.value})
    }
    handleValChange(e) {
        this.setState({register : this.state.register, value : e.target.value})
    }

    render(){
        const handleRegChange = this.handleRegChange.bind(this)
        const handleValChange = this.handleValChange.bind(this)
        const handleSend = this.handleSend.bind(this)

        return <div>
            <label>Register <input type='number' name='register' onChange={handleRegChange}/></label>
            <label>Value <input type='number' name='value' onChange={handleValChange}/></label>
            <button onClick={handleSend}>Send</button>
        </div>
    }
}

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
                <div className="col-md-3">
                    <HornButton hornClick={operations.horn}/>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-3 form">
                    <CustomCommand sendCommand={operations.custom}/>
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