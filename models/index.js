require('dotenv').config()
const mongoose = require('mongoose')

// LOCAL DB CONNECTION
//const connectionString = 'mongodb://localhost/zookeeper'
// ATLAS DB CONNECTION
const connectionString = process.env.DATABASE_URL

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${connectionString}`))
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'))
mongoose.connection.on('error', (err) => console.log('Mongoose error:', err))

module.exports = {
    Enclosure: require('./enclosure'),
    Animal: require('./animal')
}