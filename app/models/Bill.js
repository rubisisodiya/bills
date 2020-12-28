const mongoose = require('mongoose')
const moment = require('moment')
const shortid = require('shortid')
// const validator = require('validator')

const Schema = mongoose.Schema

const billSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product' 
        },
        stock: {
            type: Schema.Types.ObjectId,
            ref: 'Stock' 
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            default: 1
        }
    }],
    billId:{
        type: String,
        default: `OrderID-[${shortid.generate().toUpperCase()}]-${moment(Date.now()).format('YYYY-MM-DD')}`
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    customer:{
        type: Schema.Types.ObjectId,
        ref: 'CustomerProfile'
    },
    total: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    otherCharges: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
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
    description:{
        type: String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
},{timestamps: true})
const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill