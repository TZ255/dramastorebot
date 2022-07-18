const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String
    },
    tags: {
        type: Array
    },
    visited: {
        type: Number,
        default: 1
    }
}, { timestamps: true, strict: false })

const model = mongoose.model('blogModel', blogSchema)
module.exports = model