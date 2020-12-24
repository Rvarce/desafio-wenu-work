const mongoose = require('mongoose')
const { config } = require('../config')
const DB_NAME = config.dbName
const DB_HOST = config.dbHost
const DB_PORT = config.dbPort

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
const db = mongoose.connection

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

// const { MongoClient, ObjectId } = require('mongodb')
// const { config } = require('../config')
// const USER = encodeURIComponent(config.dbUser)
// const PASSWORD = encodeURIComponent(config.dbPassword)
// const DB_NAME = config.dbName

// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=mayority`

// class MongoLib {
//     constructor() {
//         this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
//         this.dbName = DB_NAME
//     }

//     connect() {
//         if (!MongoLib.connection){
//             MongoLib.connection = new Promise((resolve, reject) => {
//                 this.client.connect(err => {
//                     if (err) {
//                         reject(err)
//                     }
//                     console.log('Connected surcefully to db')
//                     resolve(this.client.db(this.dbName))
//                 })
//             })
//         }
//         return MongoLib.connection
//     }
// }

