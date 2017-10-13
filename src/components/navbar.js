import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import BatteryView from './battery_view'
import RegisterView from './register_view'
import OperationsView from './operations_view'
import ConnectView from './connect_view'
import HomeView from './home-view'

class NavBar extends React.Component {

    constructor(props) {
        super(props)
        this.data = props.data
        this.operations = props.operations

    }
    render() {

        const data = this.data
        const operations = this.operations

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-static-top">
                        <ul className="nav navbar-nav">
                            <li className="nav-item"><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home</Link></li>
                            <li className="nav-item"><Link to="/battery"><span className="glyphicon glyphicon-flash" aria-hidden="true"></span> Battery</Link></li>
                            <li className="nav-item"><Link to="/operations"><span className="glyphicon glyphicon-off" aria-hidden="true"></span> Operations</Link></li>
                            <li className="nav-item"><Link to="/registers"><span className="glyphicon glyphicon-list" aria-hidden="true"></span> Registers</Link></li>
                        </ul>
                        <ConnectView data={data} />
                    </nav>
                    <Route exact path="/" render={props => (<HomeView data={data} operations={operations} />)} />
                    <Route exact path="/battery" render={props => (<BatteryView data={data} operations={operations} />)} />
                    <Route exact path="/operations" render={props => (<OperationsView data={data} operations={operations} />)} />
                    <Route exact path="/registers" render={props => (<RegisterView data={data} count={0} operations={operations} />)} />
                </div>
            </Router>)
    }
}

export default NavBar