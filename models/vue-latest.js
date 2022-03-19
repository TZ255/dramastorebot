const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LatestSchema = new Schema({
    dramaId: {
        type: String,
        required: true
    },
    dramaName: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: false })

var LatestModel = mongoose.model('latestEpisodes', LatestSchema)
module.exports = LatestModel