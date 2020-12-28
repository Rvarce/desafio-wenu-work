const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./lib/mongo')
require('./config/passport')

const app = express()

const { config } = require('./config/index')
const { logError, errorHandler, wrapError } = require('./middleware/errorHandle.js')
const notFoundHandler = require('./middleware/notFoundHandler')

//Archivos de Rutas
const characterApi = require('./routes/characters')
const userApi = require('./routes/users')

//Middleware
app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use(passport.session())

//CORS
app
.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//Rutas
characterApi(app)
userApi(app)

//Capturar error 404
app.use(notFoundHandler)

//Middleware de errores
app
    .use(logError)
    .use(wrapError)
    .use(errorHandler)

//Run server
app.listen(config.port, () => {
    console.log(`Listen in http://localhost:${config.port}`)
})