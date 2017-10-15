import React from 'react'

class CustomCommand extends React.Component {

    constructor(props) {
        super(props)
        this.state = { register: 0, value: 0 }
        this.sendCommand = props.sendCommand
    }

    handleSend() {
        this.sendCommand(this.state.register, this.state.value)
    }
    handleRegChange(e) {
        this.setState({ register: e.target.value, value: this.state.value })
    }
    handleValChange(e) {
        this.setState({ register: this.state.register, value: e.target.value })
    }

    render() {
        const handleRegChange = this.handleRegChange.bind(this)
        const handleValChange = this.handleValChange.bind(this)
        const handleSend = this.handleSend.bind(this)

        return <div>
            <label>Register <input type='number' name='register' onChange={handleRegChange} /></label>
            <label>Value <input type='number' name='value' onChange={handleValChange} /></label>
            <button onClick={handleSend}>Send</button>
        </div>
    }
}

export default CustomCommand
