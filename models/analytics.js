const mongoose = require('mongoose')
const Schema = mongoose.Schema

const analyticsSchema = new Schema({
    times: {
        type: Number,
    }
}, { strict: false })

const dramastore = mongoose.connection.useDb('dramastore')
const model = dramastore.model('analytics', analyticsSchema)
module.exports = model