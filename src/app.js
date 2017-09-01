import React from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rxjs'
import PhevView from './components/phev_view'

const data = Rx.Observable
    .interval(500)
    .map(x => x % 100)
    .map(x => ({ battery : { soc : x, charging : true, chargeType : 'regular' } }))

const operations = {}

ReactDOM.render((<div className='container-fluid'><PhevView data={data} operations={operations}/></div>),document.getElementById('root'))