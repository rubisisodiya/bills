const mongoose = require('mongoose')
// const validator = require('validator')

const Schema = mongoose.Schema

const expenditureSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    details: {
        type: String,
        required: true
    },
    payMode: {
        type: String,
        enum: ['Net-Banking','Cash','UPI','Cheque'],
        required: true
    },
    paymentDetails:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    expenditureType: {
        type: Schema.Types.ObjectId,
        ref: 'ExpenditureType'
    }
})
const Expenditure = mongoose.model('Expenditure', expenditureSchema)

module.exports = Expenditure