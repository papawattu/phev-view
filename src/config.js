const config = {
    mqttUri: process.env.MQTTURI || 'wss://secure.wattu.com:8883/mqtt',
    receiveTopic: 'phev/receive',
    sendTopic: 'phev/send',

}

export default config
