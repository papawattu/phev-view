import React from 'react'
import { Observable, Subject } from 'rxjs'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalClose,
  ModalFooter
} from './modal'

const DEBOUNCE_TIME = 500
const AirConButton = props => <button onClick={props.airConClick} className={'btn-block' + (props.enabled ? "btn btn-success" : "btn btn-primary")}>Air Conditioning</button>
const HeadLightsButton = props => <button onClick={props.headLightClick} className={'btn-block' + (props.enabled ? "btn btn-success" : "btn btn-primary")}>Head Lights</button>
const ParkLightsButton = props => <button onClick={props.parkLightClick} className={'btn-block' + (props.enabled ? "btn btn-success" : "btn btn-primary")}><span className="glyphicon glyphicon-lightbulb"></span>Parking Lights</button>

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

        this.headLightSubject = new Subject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.headLights(!this.state.lights.headLightsOn))
                .catch(err => Observable.of({ status: 500})))
            .map(response => response.status)
        this.airConSubject = new Subject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.airCon(!this.state.airCon.enabled))
                .catch(err => Observable.of({ status: 500})))
            .map(response => response.status)
        this.parkLightsSubject = new Subject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.parkLights(!this.state.lights.parkingLightsOn))
                .catch(err => Observable.of({ status: 500})))
            .map(response => response.status)
        
        this.state = { 
            airCon: { 
                enabled: this.airCon.enabled
            }, 
            lights: {
                headLightsOn: this.lights.headLightsOn,
                parkingLightsOn: this.lights.parkingLightsOn
            },
            error: undefined,
        }
    }
    componentDidMount() {
        this.airConSub = this.airCon
            .subscribe(data => this.setState({airCon: data}))
        this.lightsSub = this.lights
            .subscribe(data => this.setState({lights: data}))
        this.headLightSubjectSub = this.headLightSubject
            .subscribe(status => {
                if(status !== 200) {
                    this.setState({ error: 'Server communications error - Failed to change head lights'  })
                }        
            })
        this.airConSubjectSub = this.airConSubject
            .subscribe(status => {
                if(status !== 200) {
                    this.setState({ error: 'Server communications error - Failed to change air conditioning'  })
                }        
            })
        this.parkLightsSubjectSub = this.parkLightsSubject
            .subscribe(status => {
                if(status !== 200) {
                    this.setState({ error: 'Server communications error - Failed to change parking lights'  })
                }        
            })

    }

    componentWillUnmount() {
        this.airConSub.unsubscribe()
        this.airConSubjectSub.unsubscribe()
        this.lightsSub.unsubscribe()
        this.headLightSubjectSub.unsubscribe()
        this.parkLightsSubjectSub.unsubscribe()
    }

    hideModal() {
        this.setState({ error: undefined })
    }
    render() {

        const operations = this.operations
        
        const airConEnabled = this.state.airCon.enabled
        const headLightsEnabled = this.state.lights.headLightsOn
        const parkingLightsEnabled = this.state.lights.parkingLightsOn
        const headLightsClick = event => {
            this.headLightSubject.next(event)
        }
        const airConClick = event => {
            this.airConSubject.next(event)
        }
        const parkLightsClick = event => {
            this.parkLightsSubject.next(event)
        }
        const hideModal = this.hideModal.bind(this)
        
        const errors = this.state.error !== undefined ? <Modal>
                <ModalHeader>
                    <ModalClose close={hideModal}/>
                    <ModalTitle>Error</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>{this.state.error}</p>
                </ModalBody>
            <ModalFooter>
                <button className='btn btn-default' onClick={hideModal}>Close</button>
            </ModalFooter>
        </Modal> : ''

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
                        <AirConButton airConClick={airConClick} enabled={airConEnabled}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <h4 className="bold">Turn head lights {headLightsEnabled ? 'off' : 'on'}</h4>
                    </div>
                    <div className="col-sm-4">
                        <HeadLightsButton headLightClick={headLightsClick} enabled={headLightsEnabled}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <h4 className="bold">Turn parking lights {parkingLightsEnabled ? 'off' : 'on'}</h4>
                    </div>
                    <div className="col-sm-4">
                        <ParkLightsButton parkLightClick={parkLightsClick} enabled={parkingLightsEnabled}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <div>
                            <div>
                                <CustomCommand sendCommand={operations.sendCommand} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errors}
        </div>

    }
}

export default OperationsView