const mongoose = require('mongoose')
const Schema = mongoose.Schema

const linkSchema = new Schema({
    channel: {
        type: String
    },
    link: {
        type: String
    }
}, { timestamps: false, strict: false})

const model = mongoose.model('backup_invites', linkSchema)
module.exports = model