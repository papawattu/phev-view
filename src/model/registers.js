const Registers = ({ messages }) => 
    messages
    //    .do(x => console.log(JSON.stringify(x)))
        .scan((registers, register) => registers.set(register.register,register.data),new Map())
        
   
export default Registers  