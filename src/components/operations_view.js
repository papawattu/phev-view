import React from 'react'

const AirConButton = props => <button onClick={props.airConClick} className={(props.enabled ? "btn btn-success" : "btn btn-primary")}>Air Conditioning</button>
const HeadLightsButton = props => <button onClick={props.headLightClick} className={(props.enabled ? "btn btn-success" : "btn btn-primary")}>Head Lights</button>
const ParkLightsButton = props => <button onClick={props.parkLightClick} className={(props.enabled ? "btn btn-success" : "btn btn-primary")}><span className="glyphicon glyphicon-lightbulb"></span>Parking Lights</button>

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
        this.data = props.data
        this.airCon = props.data.airCon
        this.lights = props.data.lights
        this.state = { 
            airCon: { 
                enabled: this.airCon.enabled
            }, 
            lights: {
                headLightsOn: this.lights.headLightsOn
            }
        }
    }
    componentDidMount() {
        this.airConSub = this.airCon
            .subscribe(data => this.setState({airCon: data}))
        this.lightsSub = this.lights
            .subscribe(data => this.setState({lights: data}))
    }

    componentWillUnmount() {
        this.airConSub.unsubscribe();
    }
    render() {

        const operations = this.operations
        
        const airConEnabled = this.state.airCon.enabled
        const headLightsEnabled = this.state.lights.headLightsOn
        const parkingLightsEnabled = true

        return <div className="panel panel-primary">
            <div className="panel-heading">
                <h4 className="panel-title">Operations</h4>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-sm-8">
                        <h4 className="bold">Turn air conditioning {airConEnabled ? 'off' : 'on'}</h4>
                    </div>
                    <div className="col-sm-4">
                        <AirConButton airConClick={operations.airCon} enabled={airConEnabled}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <h4 className="bold">Turn head lights {headLightsEnabled ? 'off' : 'on'}</h4>
                    </div>
                    <div className="col-sm-4">
                        <HeadLightsButton headLightClick={operations.headLights} enabled={headLightsEnabled}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <h4 className="bold">Turn parking lights {parkingLightsEnabled ? 'off' : 'on'}</h4>
                    </div>
                    <div className="col-sm-4">
                        <ParkLightsButton parkLightClick={operations.parkLights} enabled={parkingLightsEnabled}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <div className="collapse">
                            <div className="collapse in">
                                <CustomCommand sendCommand={operations.custom} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default OperationsView