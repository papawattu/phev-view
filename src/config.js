import prod_mqtt from 'mqtt'

export const mqttUri = 'wss://secure.wattu.com:8883/mqtt'
export const sendTopic = 'phec/send'

let mqtt = undefined

if(process.env.NODE_ENV === 'test') {
    mqtt = prod_mqtt
} else {
    mqtt = prod_mqtt 
}

export { mqtt } 
