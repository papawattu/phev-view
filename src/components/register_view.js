import React from 'react'
import codes from '../ref_data/phev_codes'
import _ from 'lodash'

class RegisterView extends React.Component {
    constructor(props) {
        super(props)
        this.registers = props.data.registers
        this.state = { registers: [] }

    }

    componentDidMount() {
        this.registers
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
        const evrCodes = _.pickBy(codes, (x, key) => key.includes('_EVR', x.length - 4))
        const regLable = register => _.findKey(evrCodes, label => label === register)
        const item = reg => <div key={reg.register}>{regLable(reg.register)} : {reg.data.toString('hex')}</div>
        const listItems = registers.map(reg => item(reg))
        return <div>{listItems}</div>
    }
}

export default RegisterView