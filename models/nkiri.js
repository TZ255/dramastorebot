const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nkiriSchema = new Schema({
    dramaName: {
        type: String
    },
    id: {
        type: String
    }
}, { timestamps: false, strict: false})

const model = mongoose.model('nkiri', nkiriSchema)
module.exports = model