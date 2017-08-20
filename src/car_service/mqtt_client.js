import { Observable } from 'rxjs'
import { mqttUri, mqtt } from '../config'

const connect = uri => mqtt.connect(uri)

const client = client || connect(mqttUri)

const send = (topic, message) => client.publish(topic, message) ? message : message

const subscribe = topic => client.subscribe(topic)

const unsubscribe = topic => client.unsubscribe(topic)

const observeEvent = ev => Observable.fromEvent(client, ev, (topic, message) => ({topic, message}))  

const messages = topic => observeEvent('message').filter(x => x.topic === topic)

export { send, messages, subscribe, unsubscribe }