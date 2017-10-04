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
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/battery">Battery</Link></li>
                            <li><Link to="/operations">Operations</Link></li>
                            <li><Link to="/registers">Registers</Link></li>
                        </ul>
                        <ConnectView data={data}/>
                    </div>
                </nav>
                <Route exact path="/" render={props => (<HomeView data={data} operations={operations}/>)}/>
                <Route exact path="/battery" render={props => (<BatteryView data={data} operations={operations}/>)}/>
                <Route exact path="/operations" render={props => (<OperationsView data={data} operations={operations}/>)}/>
                <Route exact path="/registers" render={props => (<RegisterView data={data} operations={operations}/>)}/>
            </div>
        </Router>)
    }
}

export default NavBar