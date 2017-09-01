import React from 'react'

import BatteryView from './battery_view'

class PhevView extends React.Component {

    constructor(props) {
        super(props)
        this.data = props.data
        this.operations = props.operations
    }
   render() {
        const data = this.data
        return <BatteryView data={data}/>
    }

}
export default PhevView