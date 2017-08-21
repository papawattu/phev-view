import mqtt from 'mqtt'
import stub_mqtt from './stubs/mqtt'

export const mqttUri = 'wss://secure.wattu.com:8883/mqtt'
export const receiveTopic = 'phev/receive'
export const sendTopic = 'phev/send'

const selected_mqtt = process.env.NODE_ENV === 'test' ? stub_mqtt : mqtt

export { selected_mqtt as mqtt}
