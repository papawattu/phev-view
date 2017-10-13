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
const OnOffButton = props => <div className="btn-group pull-right">
                                    <button className="btn btn-default disabled">On</button><button className="btn btn-default">Off</button>
                                </div>

const AirConButton = props => <button onClick={!props.disabled ? props.airConClick : () => undefined} className={props.disabled ? "disabled" : "" + (props.enabled ? "btn btn-success" : "btn btn-default")}>Air Conditioning</button>
const ParkLightsButton = props => <button onClick={props.enabled ? props.airConClick : () => undefined } className={(props.enabled ? "btn btn-success" : "btn btn-default")}><span className="glyphicon glyphicon-lightbulb"></span>Parking Lights</button>
const HeadLightsButton = props => <button onClick={props.enabled ? props.airConClick : () => undefined} className={(props.enabled ? "btn btn-success" : "btn btn-default")}>Head Lights</button>

const AirCon = props => <div><label>Air Conditioning</label> <OnOffButton {...props}/></div>
const HeadLights = props => <label>Head Lights <HeadLightsButton {...props}/></label>
const ParkLights = props => <label>Parking Lights <ParkLightsButton {...props}/></label>

const ErrorModal = props => props.error !== undefined ? <Modal>
            <ModalHeader>
                <ModalClose close={props.hideModal} />
                <ModalTitle>Error</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <p>{props.error}</p>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-default' onClick={props.hideModal}>Close</button>
            </ModalFooter>
        </Modal> : null

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
                .catch(err => Observable.of({ status: 500 })))
            .map(response => response.status)
        this.airConSubject = new Subject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.airCon(!this.state.airCon.enabled))
                .catch(err => Observable.of({ status: 500 })))
            .map(response => response.status)
        this.parkLightsSubject = new Subject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.parkLights(!this.state.lights.parkingLightsOn))
                .catch(err => Observable.of({ status: 500 })))
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
            .subscribe(data => this.setState({ airCon: data }))
        this.lightsSub = this.lights
            .subscribe(data => this.setState({ lights: data }))
        this.headLightSubjectSub = this.headLightSubject
            .subscribe(status => {
                if (status !== 200) {
                    this.setState({ error: 'Server communications error - Failed to change head lights' })
                }
            })
        this.airConSubjectSub = this.airConSubject
            .subscribe(status => {
                if (status !== 200) {
                    this.setState({ error: 'Server communications error - Failed to change air conditioning' })
                }
            })
        this.parkLightsSubjectSub = this.parkLightsSubject
            .subscribe(status => {
                if (status !== 200) {
                    this.setState({ error: 'Server communications error - Failed to change parking lights' })
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

        return <div className="col-lg-6">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Operations</h4>
                </div>
                <div className="panel-body">
                    <div>
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item"><AirCon airConClick={airConClick} enabled={airConEnabled}/></li>
                                <li className="list-group-item"><AirCon airConClick={airConClick} enabled={airConEnabled}/></li>
                            </ul>
                            
                            <HeadLights headLightClick={headLightsClick} enabled={headLightsEnabled} />
                            <ParkLights parkLightClick={parkLightsClick} enabled={parkingLightsEnabled} />
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
                <ErrorModal error={this.state.error} hideModal={hideModal}/>>
            </div>
        </div>

    }
}

export default OperationsView