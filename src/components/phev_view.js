import React from 'react'

import NavBar from './navbar'
import OnOffButton from './onoff-button'

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
            <NavBar data={data} operations={operations}/>
        </div>
    }
}
export default PhevView