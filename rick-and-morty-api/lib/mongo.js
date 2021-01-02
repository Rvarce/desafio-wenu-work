const mongoose = require('mongoose')
const { config } = require('../config')
const DB_NAME = config.dbName
const DB_HOST = config.dbHost
const DB_PORT = config.dbPort

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
const db = mongoose.connection
mongoose.set('useCreateIndex', true)

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(err => console.log(err))

db.once('open', _ => {
    console.log('Database in connected to ', uri)
})

db.on('error', err => {
    console.log(err)
})
