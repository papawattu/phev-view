import React from 'react'

class RegisterView extends React.Component {
    constructor(props) {
        super(props)
        this.registers = props.data.registers
        this.state = { registers: [] }

    }

    componentDidMount() {
        this.registers
            //.do(x => console.log('*** ' + JSON.stringify(x)))
            .subscribe(data => {
                const newRegisters = this.state.registers.slice()
                const idx = newRegisters.findIndex(x => x.register === data.register)

                idx < 0 ? newRegisters.push(data) : newRegisters[idx] = data
                this.setState({ registers: newRegisters })
            });
    }

    componentWillUnmount() {
        this.registers.unsubscribe();
    }
    render() {
        const registers = this.state.registers.slice()
        const item = reg => <div key={reg.register}>{reg.register} : {reg.data.toString('hex')}</div>
        const listItems = registers.map(reg => item(reg))
        return <div>{listItems}</div>
    }
}

export default RegisterView