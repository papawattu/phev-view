import React from 'react'
import _ from 'lodash'

const ChargeState = props => {
    const charging = props.state ? 'Charging' : 'Not Charging '
    const labelClass = props.state ? 'label label-success' : 'label label-primary'
    const chargeType = props.state ? <p>Charge type : <span className={labelClass}>{_.capitalize(props.chargeType)}</span></p> : ''

    return <div>
        <div className="col-m-3">
            <p>Charge status : <span className={labelClass}>{charging}</span></p>
            {chargeType}
        </div>
    </div>
}

const BatteryGauge = props => {
    const soc = '' + (props.soc < 94 ? props.soc : 100) + '%'
    const timeRemaining = props.remaining,
        timeRemainingHrs = Math.trunc(timeRemaining / 60),
        timeRemainingMins = Math.trunc(timeRemaining - (timeRemainingHrs * 60))
    const timeRemainingMarkup = props.state ? `Time remaining to fully charged is approximately ${timeRemainingHrs} hours and ${timeRemainingMins} minutes`
        : ''
    const progressBarClasses = 'progress-bar ' + (props.soc > 9 ? (props.soc > 39 ? 'progress-bar-success' : 'progress-bar-warning') : 'progress-bar-danger')

    return <div id="battery" className="">
        <div className="progress text-center">
            <div className={progressBarClasses} role="progressbar" style={{ minWidth: '2em', width: soc }}><span style={{ color: 'black' }}>{soc} Charged</span></div>
        </div>
        <p>{timeRemainingMarkup}</p>
    </div>
}

class BatteryView extends React.Component {
    constructor(props) {
        super(props)
        this.battery = props.data.battery
        this.state = { soc: 0, charging: false, chargeType: undefined, remaining: 0 }

    }

    componentDidMount() {
        this.batterySub = this.battery
            .subscribe(data => this.setState(data))
    }

    componentWillUnmount() {
        this.batterySub.unsubscribe();
    }

    render() {
        return <div className="col-lg-6"><div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">Battery</h4>
            </div>
            <div className="panel-body">
                <BatteryGauge soc={this.state.soc} remaining={this.state.remaining} state={this.state.charging} />
                <ChargeState chargeType={this.state.chargeType} state={this.state.charging} />
            </div>
        </div>
        </div>
    }
}

export default BatteryView