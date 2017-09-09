import React from 'react'
import codes from '../ref_data/phev_codes'
import _ from 'lodash'


const ecuRegDecode = (a, b) => ({ idx: a & 63, enbl: ((b >> 1) & 127), val: (((a >> 6) & 3) | ((b << 2) & 4)) })

const ECUView = props => {

    const ecuTableBody = props.ecuRegs.map(x => <tr>
        <td>{x.idx}</td>
        <td>{x.enbl}</td>
        <td>{x.val}</td>
    </tr>)

    return <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Enabled</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {ecuTableBody}
            </tbody>
        </table>
    </div>
}
class RegisterView extends React.Component {
    constructor(props) {
        super(props)
        this.registers = props.data.registers
        this.state = { registers: [], ecuRegisters: [], hidden: false }

    }

    componentDidMount() {

        const hidden = this.state.hidden

        this.registers
            .subscribe(data => {
                const updatedRegisters = this.state.registers.slice()
                const updatedECURegisters = this.state.ecuRegisters.slice() 
                
                const idx = updatedRegisters.findIndex(x => x.register === data.register)

                idx < 0 ? updatedRegisters.push(data) : updatedRegisters[idx] = data

                if (data.register === 22) {
                    const ecuRegs = data.data.slice(1, 6)

                    const ecuRegPairs = ecuRegs.reduce((x, y, idx) => {
                        if((idx % 2) === 0) { 
                            x.push({ byte1: y })
                            return x 
                        } else {
                            x[Math.trunc(idx / 2)] = _.merge(x[Math.trunc(idx / 2)], { byte2: y })
                            return x
                        } 
                    },[])

                    const ecuRegisters = ecuRegPairs.map(x => ecuRegDecode(x.byte1, x.byte2))
                    
                    ecuRegisters.map(x => (updatedECURegisters.find(y => y.idx === x.idx) > -1 ? updatedECURegisters[updatedECURegisters.find(z => z.idx === x.idx)] = x : updatedECURegisters.push(x)))
                    //ecuRegisters.map(x => updatedECURegisters.findIndex(y => x.idx === y.idx) < 0 ?
                    //    updatedECURegisters.push(x) : updatedECURegisters[x.idx] = x)
                }

                this.setState({ registers: updatedRegisters, ecuRegisters: updatedECURegisters.sort((a,b) => a.idx - b.idx), hidden: this.state.hidden })
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

        const row = x => <td style={{ width: '2em' }}>{toHex(x)}</td>

        const bob = x => Array.from(x).map(y => row(y))
        const item = reg => <tr><td key={reg.register}>{regLable(reg.register)}</td>{bob(reg.data)}</tr>
        const listItems = registers.map(reg => item(reg))
        const removeLabel = this.state.hidden ? 'Show' : 'Remove'
        const toggle = () => this.setState({ hidden: !this.state.hidden })
        return <div>
            <div className="row">
                <div className="panel-group">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-target="#collapse1">Registers</a>
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
            <div>
                <ECUView ecuRegs={this.state.ecuRegisters}/>
            </div>
        </div>
    }
}

export default RegisterView