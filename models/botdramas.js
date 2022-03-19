const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dramaSchema = new Schema({
    dramaName: {
        type: String,
        required: true
    },
    dramaId: {
        type: String,
        required: true
    },
    noEpisodes: {
        type: String,
        required: true
    },
    telegraph: {
        type: String,
        required: true
    },
    next: {
        type: String,
        default: '@dramastore1'
    }
}, {timestamps: true})

const model = mongoose.model('dramaModel', dramaSchema)
module.exports = model