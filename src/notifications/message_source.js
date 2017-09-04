import { Observable } from 'rxjs'

const messages = new Observable.interval(500)
    .map(x => x % 100)
    .map(x => ({ register : 29, data: Buffer.from([x,0,0,0])})) 

export default messages