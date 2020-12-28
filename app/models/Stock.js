const mongoose = require('mongoose')

// const validator = require('validator')

const Schema = mongoose.Schema

const stockSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    stockPrice: {
        type: Number,
        required: true,
        default: 0
    }
})
const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock