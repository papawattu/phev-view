import React from 'react'

import BatteryView from './battery_view'
import RegisterView from './register_view'
import OperationsView from './operations_view'
import ConnectView from './connect_view'

class PhevView extends React.Component {

    constructor(props) {
        super(props)
        this.data = props.data
        this.operations = props.operations

    }
    render() {
        const data = this.data
        const operations = this.operations

        
        return <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <h1>Phev View</h1>
                    <p>Some text</p>
                </div>
                <div className="col-sm-6">
                    <ConnectView data={data} operations={operations}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <BatteryView data={data} />
                </div>
                <div className="col-sm-6">
                    <OperationsView data={data} operations={operations} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <RegisterView data={data} />
                </div>
            </div>
        </div>
    }
}
export default PhevView