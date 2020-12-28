const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const DealerProfileSchema = new Schema({
    gstn: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    companyPhone: {
        type: Number
    },
    companyAddress: {
        type: String
    },
    dealerName: {
        type: String,
        required: true
    },
    dealerPhone: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true})

const DealerProfile = mongoose.model('DealerProfile', DealerProfileSchema)

module.exports = DealerProfile