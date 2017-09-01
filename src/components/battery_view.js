import React from 'react'
import _ from 'lodash'

const ChargeState = props => {
    const charging = props.state ? 'Charging ' : 'Not Charging '
    const chargeType = _.capitalize(props.chargeType)
    const labelClass = props.state ? 'label label-success' : 'label label-primary'

    return <div className="well">
        <div className="col-m-3">
            <p>Charge status : <span className={labelClass}>{charging}</span></p>
            <p>Charge type : <span className={labelClass}>{chargeType} </span></p>
        </div>
    </div>
}

class BatteryGauge extends React.Component {
    constructor(props) {
        super(props)
        this.data = props.data
        this.state = {soc: null}
    }

    componentDidMount() {
        this.data
            .map(x => x.battery.soc)
            .subscribe(data => this.setState({soc: data}));
    }

    componentWillUnmount() {
        this.registers.unsubscribe();
    }

    render() {
        const soc = '' + this.state.soc + '%'
        const timeRemaining = (100 - this.state.soc) * 2.1,
            timeRemainingHrs = Math.trunc(timeRemaining / 60),
            timeRemainingMins = Math.trunc(timeRemaining - (timeRemainingHrs * 60))


        return <div id="battery" className="col-m-3">
            <h3>Battery</h3>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width : soc}}>{soc} Charged</div>
            </div>
            <p>Time remaining to fully charged is approximately {timeRemainingHrs} hours and {timeRemainingMins}
                minutes</p>
        </div>
    }
}

class BatteryView extends React.Component {
    constructor(props) {
        super(props)
        this.data = props.data
        this.state = { battery : { charging : false, chargeType : undefined} }

    }


    componentDidMount() {
        this.data
            .map(x => x.battery)
            .subscribe(data => this.setState({battery: data}));
    }

    componentWillUnmount() {
        this.registers.unsubscribe();
    }

    render() {

        return <div><BatteryGauge data={this.data}/><ChargeState chargeType={this.state.battery.chargeType} state={this.state.battery.charging}/></div>
    }
}

export default BatteryView