const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const EmployeeProfileSchema = new Schema({
    employeeId: {
        type: String
    },
    address: {
        type: String
    },
    key: {
        type: String,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})
const EmployeeProfile = mongoose.model('EmployeeProfile', EmployeeProfileSchema)

module.exports = EmployeeProfile