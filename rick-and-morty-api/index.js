const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./lib/mongo')
require('./config/passport')

const app = express()

const { config } = require('./config/index')

//Archivos de Rutas
const characterApi = require('./routes/characters')
const userApi = require('./routes/users')

//Middleware
app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use(passport.session())
//Rutas
characterApi(app)
userApi(app)

//Run server
app.listen(config.port, () => {
    console.log(`Listen in http://localhost:${config.port}`)
})