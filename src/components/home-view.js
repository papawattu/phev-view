import React from 'react'
import Doors from '../model/doors'

class HomeView extends React.Component {
    constructor(props) {
        super(props)
        this.doors = props.data.doors
        this.state = { doors: {doorsLocked: true} }
    }
    componentDidMount() {
        this.doorsSub = this.doors
            .subscribe(data => this.setState( { doors: data }))
    }

    componentWillUnmount() {
        this.doorsSub.unsubscribe();
    }
    render() {
        const doorsLocked = this.state.doors.doorsLocked
        
        return <div className="container">
            <div className="col-lg-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Car status summary</h4>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">Doors are {doorsLocked ? "locked" : "unlocked"}</li>
                            <li className="list-group-item">Alarm is on</li>
                            <li className="list-group-item">Power is Off</li>
                            <li className="list-group-item">Battery is at 50%</li>
                            <li className="list-group-item">Battery is being charged and should be fully charged in about 1 hour</li>
                            <li className="list-group-item">Air conditioning is Off</li>
                            <li className="list-group-item">Charging timer not set</li>
                            <li className="list-group-item">Heating timer not set</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Another panel</h4>
                    </div>
                    <div className="panel-body">
                        <p>Hello</p>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default HomeView