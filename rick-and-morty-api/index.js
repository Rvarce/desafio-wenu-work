const express = require('express')
const bodyParser = require('body-parser')
require('./lib/mongo')

const app = express()

const { config } = require('./config/index')

//Archivos de Rutas
const characterApi = require('./routes/characters')

//Middleware
app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

//Rutas
characterApi(app)

//Run server
app.listen(config.port, () => {
    console.log(`Listen in http://localhost:${config.port}`)
})