import React from 'react'
import codes from '../ref_data/phev_codes'
import _ from 'lodash'

class RegisterView extends React.Component {
    constructor(props) {
        super(props)
        this.registers = props.data.registers
        this.state = { registers: [], hidden: false }

    }

    componentDidMount() {

        const hidden = this.state.hidden

        this.registers
            .subscribe(data => {
                const newRegisters = this.state.registers.slice()
                const idx = newRegisters.findIndex(x => x.register === data.register)

                idx < 0 ? newRegisters.push(data) : newRegisters[idx] = data
                this.setState({ registers: newRegisters, hidden: this.state.hidden })
            });
    }

    componentWillUnmount() {
        this.registers.unsubscribe();
    }
    render() {
        const registersClass = this.state.hidden ? 'hidden table table-striped' : 'table table-striped'
        const registers = this.state.registers.slice()
        const evrCodes = _.pickBy(codes, (x, key) => key.includes('_EVR', x.length - 4))
        const regLable = register => _.findKey(evrCodes, label => label === register) ? _.findKey(evrCodes, label => label === register) : 'NO LABEL ' + register
        const toHex = dec => (Number.parseInt(dec).toString(16).length < 2 ?
            '0' + Number.parseInt(dec).toString(16)
            : Number.parseInt(dec).toString(16));

        const row = x => <td style={{ width: '2em'}}>{toHex(x)}</td>

        const bob = x => Array.from(x).map(y => row(y))
        const item = reg => <tr><td key={reg.register}>{regLable(reg.register)}</td>{bob(reg.data)}</tr>
        const listItems = registers.map(reg => item(reg))
        const removeLabel = this.state.hidden ? 'Show' : 'Remove'
        const toggle = () => this.setState({ hidden: !this.state.hidden })
        return <div className="row">
            <div className="panel-group">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-target="#collapse1">Registers panel</a>
                        </h4>
                    </div>
                    <div className="panel-collapse collapse in">
                        <div id="collapse1" className="panel-body">
                            <table className={registersClass}><thead><th>Register</th><th>Data</th></thead><tbody>{listItems}</tbody></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default RegisterView