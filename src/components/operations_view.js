import React from 'react'

const RefreshButton = props => <button onClick={props.updateClick} className="btn btn-primary"><span className="glyphicon glyphicon-refresh"></span></button>
const AirConButton = props => <button onClick={props.airConClick} className="btn btn-default">Air Conditioning</button>
const HeadLightsButton = props => <button onClick={props.headLightClick} className="btn btn-default">Head Lights</button>
const ParkLightsButton = props => <button onClick={props.parkLightClick} className="btn btn-default"><span className="glyphicon glyphicon-lightbulb"></span>Parking Lights</button>
const HornButton = props => <button onClick={props.hornClick} className="btn btn-default"><span className="glyphicon glyphicon-lightbulb"></span>Horn</button>
const DoorLockButton = props => <button onClick={props.doorLockClick} className="btn btn-default"><span className="glyphicon glyphicon-lightbulb"></span>Door Lock</button>

class CustomCommand extends React.Component {

    constructor(props) {
        super(props)
        this.state = { register: 0, value: 0 }
        this.sendCommand = props.sendCommand
    }

    handleSend() {
        this.sendCommand(this.state.register, this.state.value)
    }
    handleRegChange(e) {
        this.setState({ register: e.target.value, value: this.state.value })
    }
    handleValChange(e) {
        this.setState({ register: this.state.register, value: e.target.value })
    }

    render() {
        const handleRegChange = this.handleRegChange.bind(this)
        const handleValChange = this.handleValChange.bind(this)
        const handleSend = this.handleSend.bind(this)

        return <div>
            <label>Register <input type='number' name='register' onChange={handleRegChange} /></label>
            <label>Value <input type='number' name='value' onChange={handleValChange} /></label>
            <button onClick={handleSend}>Send</button>
        </div>
    }
}

class OperationsView extends React.Component {
    constructor(props) {
        super(props)
        this.operations = props.operations
        this.data = props.operations
    }
    render() {

        const operations = this.operations

        return <div className="panel panel-primary">
            <div className="panel-heading">
                <h4 className="panel-title">Operations</h4>
            </div>
            <div className="panel-body">
                <div>
                    <div>
                        <AirConButton airConClick={operations.airCon} />
                    </div>
                    <div>
                        <HeadLightsButton headLightClick={operations.headLights} />
                    </div>
                    <div>
                        <ParkLightsButton parkLightClick={operations.parkLights} />
                    </div>
                    <div>
                        <HornButton hornClick={operations.horn} />
                    </div>
                </div>
                <div>
                    <div>
                        <CustomCommand sendCommand={operations.custom} />
                    </div>
                </div>
            </div>
        </div>
    }
}

export default OperationsView