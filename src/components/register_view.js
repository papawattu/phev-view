import React from 'react'
import codes from '../data/codes'
import _ from 'lodash'
import { ReplaySubject } from 'rxjs'

const ecuRegDecode = (a, b) => ({ idx: a & 63, enbl: ((b >> 1) & 127), val: (((a >> 6) & 3) | ((b << 2) & 4)) })

const EcuTableBody = props =>
    (<tbody>{Array.from(props.ecuRegs).map(x =>
        <tr key={x[0]}>
            <td>{x[1].idx}</td>
            <td>{x[1].enbl}</td>
            <td>{x[1].val}</td>
        </tr>)}
    </tbody>)

const EcuView = props =>
    (<table className='table table-striped'>
        <thead>
            <tr key='header'>
                <th>Index</th>
                <th>Enabled</th>
                <th>Value</th>
            </tr>
        </thead>
        <EcuTableBody ecuRegs={props.ecuRegs} />
    </table>)

const toHex = dec => (Number.parseInt(dec).toString(16).length < 2 ?
    '0' + Number.parseInt(dec).toString(16).toUpperCase()
    : Number.parseInt(dec).toString(16).toUpperCase());

const Data = props => <td>{props.data.map(data => toHex(data) + ' ')}</td>

const evrCodes = _.pickBy(codes, (x, key) => key.includes('_EVR', x.length - 4))

const regLabel = register => _.findKey(evrCodes, label => label === register)
    ? _.findKey(evrCodes, label => label === register) : 'NO LABEL ' + register

const Row = props =>
    (<tr>
        <td>
            {regLabel(props.register[0])}
        </td>
        <Data data={props.register[1]} />
    </tr>)

const ListItems = props =>
    (<tbody>{Array.from(props.registers.entries()).map(reg =>
        <Row key={reg[0]} register={reg} />)}
    </tbody>)

const RegisterTable = props =>
    (<table className='table table-striped'>
        <thead>
            <tr key='header'>
                <th>Register</th>
                <th>Data</th>
            </tr>
        </thead>
        <ListItems registers={props.registers} />
    </table>)

class RegisterView extends React.Component {
    constructor(props) {
        super(props)

        this.registers = props.data.registers
        this.operations = props.operations

        this.state = { registers: new Map(), ecuRegisters: new Map() }

    }
    registerUpdate(registers) {
        /*
         if(data.register === KO_WF_ECU_CUSTOM_INFO_REP_EVR) {
             const ecuRegs = data.data.slice(1, 6)
             
             ecuRegisters.set(ecuRegs[0],ecuDecode(ecuRegs[0],ecuRegs[1]))
             ecuRegisters.set(ecuRegs[2],ecuDecode(ecuRegs[2],ecuRegs[3]))
             ecuRegisters.set(ecuRegs[4],ecuDecode(ecuRegs[4],ecuRegs[5]))
             
         } else {
             
             registers.set(data.register,data.data)            
         }
         */
        this.setState({ registers })
    }
    componentDidMount() {
        this.count++
        this.setState({ count: this.count })
        this.registersSub = this.registers
            .subscribe(data => this.registerUpdate(data))
    }

    componentWillUnmount() {
        this.registersSub.unsubscribe();
    }
    render() {
        return <div>
            <div>
                <RegisterTable registers={this.state.registers} />
            </div>
            <div>
            </div>
        </div>
    }
}

export default RegisterView