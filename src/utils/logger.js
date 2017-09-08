const log = msg => process.env.DEBUG ? console.log(msg) : undefined
const logInfo = msg => console.info(msg)  
const logWarn = msg => console.warn(msg)  
const logErr = msg => console.error(msg)  

export default log 
export { logInfo, logErr, logWarn } 