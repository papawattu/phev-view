import React from 'react'

class HomeView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading"><h4 className="panel-title">Car Status</h4></div>
            <div className="panel-body">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-dark">Doors are locked</li>
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
    }
}
export default HomeView