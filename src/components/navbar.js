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



const LoginLogout = props => <ul className="nav navbar-nav navbar-right">
    <li><a href="#login">Login / Register</a></li>
</ul>

const Home = props => <div>Home</div>

class NavBar extends React.Component {

    constructor(props) {
        super(props)
        this.data = props.data
        this.operations = props.operations

    }
    render() {

        const data = this.data
        const operations = this.operations

        return <Router><div><nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><Link to="/" data={data} operations={operations}>Home</Link></li>
                    <li><Link to="/battery">Battery</Link></li>
                    <li><a href="#operations">Operations</a></li>
                    <li><a href="#timers">Timers</a></li>
                    <li><Link to="/registers">Registers</Link></li>
                </ul>
                <LoginLogout />
            </div>
        </nav>
            <Route exact path="/" component={Home}/>
            <Route exact path="/battery" render={props => (<BatteryView data={data} operations={operations}/>)}/>
            <Route exact path="/registers" render={props => (<RegisterView data={data} operations={operations}/>)}/>

        </div>
        </Router>
    }
}

export default NavBar