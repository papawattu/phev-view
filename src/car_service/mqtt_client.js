import { Obserable } from 'rxjs'
import { sendTopic, mqttUri, mqtt } from '../config'

const connect = uri => mqtt.connect(uri)

const client = client || connect(mqttUri)

const send = message => client.publish(sendTopic,message) ? message : message

const messages = () => Obserable.fromEvent(client,'message')

export { send }