import { Observable } from 'rxjs'

const Registers = ({ messages }) => 
    messages.scan((registers, register) => registers.set(register.register,register.data),new Map())
   
export default Registers  