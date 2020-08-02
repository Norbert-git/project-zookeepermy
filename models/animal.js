const mongoose = require('mongoose')
const Enclosure = require('./enclosure')
const Keeper = require('./keeper')
const Comment = require('./comment')

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: String,
    age: Number,
    lastChecked: Date,
    lastKeeper: String,
    // lastKeeper: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Keeper"
    // },
    comments: String,
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // }],
    currentMeds: [String],
    img: String
})

const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal