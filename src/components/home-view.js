import React from 'react'
import codes from '../ref_data/phev_codes'
import { Observable } from 'rxjs'

const isDisconnected = () => <h4><span className="pull-right label label-danger">Disconnected <span className="glyphicon glyphicon-ban-circle" aria-hidden="true"/></span></h4>
const isConnected = () => <h4><span className="pull-right label label-success">Connected <span className="glyphicon glyphicon-ok-circle" aria-hidden="true"/></span></h4>


const Connected = props => props.updated.getTime() + 35000 < props.now.getTime() ? isDisconnected() : isConnected()

class HomeView extends React.Component {
    constructor(props) {
        super(props)
        this.registers = props.data.registers
        this.state = { lastUpdated : new Date(), now: new Date() }
    }

    componentDidMount() {
        this.currentTime = Observable.interval(5000)
            .map(x => new Date())
        this.registersSub = this.registers
            .filter(x => x.register === codes.KO_WF_DATE_INFO_SYNC_EVR)
            .map(x => x.data)
            .map(x => new Date(x[0] + 2000,x[1]-1,x[2],x[3]+1,x[4],x[5]))
            
        this.connection = Observable.combineLatest([this.registersSub,this.currentTime])
            .subscribe(data => this.setState({ lastUpdated: data[0], now: data[1] }))
    }

    componentWillUnmount() {
        this.connection.unsubscribe()
    }
    render() {
        const lastUpdated = this.state.lastUpdated
        const now = this.state.now

        return (<div className="pull-right"><div><Connected now={now} updated={lastUpdated}/></div><div className="pull-right"><p>Last Updated {lastUpdated.toDateString()} {lastUpdated.toLocaleTimeString()}</p></div></div>)
    }   
}
export default HomeView