import mqtt from 'mqtt'
import { Observable } from 'rxjs'

const client = ({ mqtt, mqttUri }) => mqtt.connect(mqttUri)

const sendToQueue = ({ message, mqtt, mqttUri, sendTopic }) => client({mqtt, mqttUri}).publish(sendTopic, message)

const observeQueue = ({mqtt, mqttUri, receiveTopic }) => Observable.fromEvent(client({mqtt, mqttUri}), 'message') 

export { client, sendToQueue, observeQueue }
