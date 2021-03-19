require('dotenv').config()
const massive = require('massive')
const express = require('express')
const ctrl = require('./products_controller')

const app = express()


const { SERVER_PORT, CONNECTION_STRING } = process.env


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    
    
})
.catch(err => console.log(err))


app.use(express.json())



app.post('/api/products', ctrl.create)
app.get('/api/products', ctrl.getOne)
app.get('/api/products/:id', ctrl.getAll)
app.put('/api/products/:id', ctrl.update)
app.delete('/api/products/:id', ctrl.delete)


app.listen(SERVER_PORT, () => console.log(`server is running on ${SERVER_PORT}`))