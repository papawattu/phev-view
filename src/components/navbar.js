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
    <li><a href="#login" data-toggle="modal" data-target="#myModal">Login / Register</a></li>
</ul>

const Home = props => <div>Home</div>

const LoginView = props => <div id="myModal" className="modal fade" role="dialog">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
                <p>Some text in the modal.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/battery">Battery</Link></li>
                    <li><Link to="/operations">Operations</Link></li>
                    <li><Link to="/registers">Registers</Link></li>
                </ul>
                <LoginLogout />
            </div>
        </nav>
            <LoginView/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/battery" render={props => (<BatteryView data={data} operations={operations}/>)}/>
            <Route exact path="/operations" render={props => (<OperationsView data={data} operations={operations}/>)}/>
            <Route exact path="/registers" render={props => (<RegisterView data={data} operations={operations}/>)}/>

        </div>
        </Router>
    }
}

export default NavBar