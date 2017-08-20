import prod_mqtt from 'mqtt'

export const mqttUri = 'wss://secure.wattu.com:8883/mqtt'
export const receiveTopic = 'phev/receive'
export const sendTopic = 'phev/send'


const mqtt = process.env.NODE_ENV === 'test' ? prod_mqtt : prod_mqtt

export { mqtt } 
