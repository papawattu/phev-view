import React from 'react'
import OnOffButton from './onoff-button'
import ErrorModal from './error-modal'
import { Observable, ReplaySubject } from 'rxjs'

const DEBOUNCE_TIME = 500

const AirCon = props => <div><label>Air Conditioning</label> <OnOffButton on={props.enabled} onClickHandler={props.airConClick} offClickHandler={props.airConClick}/></div>
const HeadLights = props => <div><label>Head Lights</label> <OnOffButton on={props.enabled} onClickHandler={props.headLightClick} offClickHandler={props.headLightClick}/></div>
const ParkLights = props => <div><label>Parking Lights</label> <OnOffButton on={props.enabled} onClickHandler={props.parkLightClick} offClickHandler={props.parkLightClick}/></div>

class OperationsView extends React.Component {
    constructor(props) {
        super(props)
        this.operations = props.operations
        this.data = props.data
        this.airCon = props.data.airCon
        this.lights = props.data.lights

        this.headLightSubject = new ReplaySubject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.headLights(!this.state.lights.headLightsOn))
                .catch(err => Observable.of({ status: 500 })))
            .map(response => response.status)
            .filter(status => status !== 200)
            
        this.airConSubject = new ReplaySubject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.airCon(!this.state.airCon.enabled))
                .catch(err => Observable.of({ status: 500 })))
            .map(response => response.status)
            .filter(status => status !== 200)
            
        this.parkLightsSubject = new ReplaySubject()
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(() => Observable.fromPromise(this.operations.parkLights(!this.state.lights.parkingLightsOn))
                .catch(err => Observable.of({ status: 500 })))
            .map(response => response.status)
            .filter(status => status !== 200)
            

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
            .subscribe(status => this.setState({ error: 'Server communications error - Failed to change head lights' }))
        this.airConSubjectSub = this.airConSubject
            .subscribe(status => this.setState({ error: 'Server communications error - Failed to change air conditioning' }))
        this.parkLightsSubjectSub = this.parkLightsSubject
            .subscribe(status => this.setState({ error: 'Server communications error - Failed to change parking lights' }))
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
        const airConEnabled = this.state.airCon.enabled === true
        const headLightsEnabled = this.state.lights.headLightsOn === true
        const parkingLightsEnabled = this.state.lights.parkingLightsOn === true
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
                                <li className="list-group-item"><HeadLights headLightClick={headLightsClick} enabled={headLightsEnabled} /></li>
                                <li className="list-group-item"><ParkLights parkLightClick={parkLightsClick} enabled={parkingLightsEnabled} /></li>
                            </ul>                
                        </div>
                    </div>
                </div>
                <ErrorModal error={this.state.error} hideModal={hideModal}/>
            </div>
        </div>
    }
}

export default OperationsView