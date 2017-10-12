const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


app.post('/send', (req, res) => {

    console.log(`=> ${JSON.stringify(req.body)}`)

    res.sendStatus(200)

    console.log(`<= 200`)

})

app.listen(8080)
console.log('Running stub server on port 8080 ')
