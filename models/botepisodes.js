const mongoose = require('mongoose')
const Schema = mongoose.Schema

const epSchema = new Schema({
    dramaId: {
        type: String,
        required: true
    },
    epno: {
        type: String,
        required: true
    },
    msgId: {
        type: Number,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('episodesModel', epSchema)
module.exports = model