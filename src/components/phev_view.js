import React from 'react'

import NavBar from './navbar'
import OnOffButton from './onoff-button'

class PhevView extends React.Component {

    constructor(props) {
        super(props)
        this.data = props.data
        this.operations = props.operations
        this.state = { on: false }

        setInterval(() => {
            console.log('State is ' + this.state.on)
            this.setState({ on: !this.state.on})
        },10000)
    }
    render() {
        const data = this.data
        const operations = this.operations

        const onClickHandler = () => {
            console.log('on') 
            this.setState({ on: true })
        }
        const offClickHandler = () => {
            console.log('off')
            this.setState({ on: false })
        }
        return <div className="container">
            <NavBar data={data} operations={operations}/>
        </div>
    }
}
export default PhevView