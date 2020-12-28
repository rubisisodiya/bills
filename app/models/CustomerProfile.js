const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const customerProfileSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: [4, 'Name must be minimum 4 character long']
    },
    email:{
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'invalid email format'
            }
        }
    },
    phone:{
        type: String,
        required: true,
        minlength: [10,'mobile number must be 10 characters long'],
        maxlength: [10, 'mobile number must be 10 characters long'],
        validate: {
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: 'mobile should be only numbers'
        }
    },
    address:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
},{timestamps: true})
const CustomerProfile = mongoose.model('CustomerProfile', customerProfileSchema)

module.exports = CustomerProfile