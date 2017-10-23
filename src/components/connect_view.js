import React from 'react'
import codes from '../data/codes'
import { Observable } from 'rxjs'

const isDisconnected = () => <h4><span className="pull-right label label-danger">Disconnected <span className="glyphicon glyphicon-ban-circle" aria-hidden="true"/></span></h4>
const isConnected = () => <h4><span className="pull-right label label-success">Connected <span className="glyphicon glyphicon-ok-circle" aria-hidden="true"/></span></h4>

const Connected = props => <div>{props.updated ? props.updated.getTime() + 35000 < props.now.getTime() ? isDisconnected() : isConnected() : ''}</div>

const LastUpdated = props => props.updated ? <p>Last Updated {props.updated.toDateString()} {props.updated.toLocaleTimeString()}</p> : <p>Connecting...</p>

class ConnectView extends React.Component {
    constructor(props) {
        super(props)
        this.registers = props.data.registers
        this.state = { lastUpdated : undefined, now: new Date() }
    }

    componentDidMount() {
        this.currentTime = Observable.interval(5000)
            .map(x => new Date())
        this.registersSub = this.registers
            .filter(x => x.get(codes.KO_WF_DATE_INFO_SYNC_EVR))
            .map(x => x.get(codes.KO_WF_DATE_INFO_SYNC_EVR))
            .map(x => new Date(x[0] + 2000,x[1]-1,x[2],x[3]+1,x[4],x[5]))
            
        this.connection = Observable.combineLatest([this.registersSub,this.currentTime])
            .subscribe(data => this.setState({ lastUpdated: data[0], now: data[1] }))
    }

    componentWillUnmount() {
        this.connection.unsubscribe()
        this.currentTime.unsubscribe()
    }
    render() {
        const lastUpdated = this.state.lastUpdated
        const now = this.state.now

        return (<div className="pull-right"><LastUpdated updated={lastUpdated}/><Connected now={now} updated={lastUpdated}/></div>)
    }  
}
export default ConnectView