const mongoose = require('mongoose')
// const validator = require('validator')

const Schema = mongoose.Schema

const expenditureTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    expenditures: []
})
const ExpenditureTypeSchema = mongoose.model('ExpenditureType', expenditureTypeSchema)

module.exports = ExpenditureTypeSchema