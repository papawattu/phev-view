import React from 'react'

const ConnectButton = props => <button onClick={props.connect}>Connect</button>
const RefreshButton = props => <button onClick={props.updateClick} className="btn btn-primary"><span className="glyphicon glyphicon-refresh"></span></button>


class ConnectView extends React.Component {
    constructor(props) {
        super(props)
        this.operations = props.operations
        this.data = props.operations

    }
    render() {

        const operations = this.operations
        const connect = () => this.operations.connect()
        const updateClick = this.operations.update.bind(this)
        
        return <div className="panel panel-primary">
            <div className="">
                <p className="text-right">Connected</p>
                <ConnectButton connect={connect.bind(this)}/>
                <RefreshButton updateClick={updateClick}/>
            </div>
        </div>
    }
}

export default ConnectView