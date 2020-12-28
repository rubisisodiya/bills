const Expenditure = require('../models/Expenditure')
const _ = require('lodash')

module.exports.list = (req, res) => {
    Expenditure.find()
        .then(expenditures => {
            res.json(expenditures)
        })
}
module.exports.create = (req, res) => {
    const body = req.body
    const expenditure = new Expenditure(body) 
    expenditure.save()
        .then(expenditure => {
            res.json(expenditure)
        }).catch(error=> res.send(error))
}
module.exports.show = (req, res) => {
    const id= req.params.id
    Expenditure.findOne({"_id":id})
        .then(expenditure => {
            res.json(expenditure)
        }).catch(error=> res.send(error))
}
module.exports.update = (req, res) => {
    const id= req.params.id
    const body= req.body
    Expenditure.findByIdAndUpdate(id,body,{new:true})
        .then(expenditure => {
            res.json(expenditure)
        }).catch(error=> res.send(error))
}
module.exports.delete = (req, res) => {
    const id = req.params.id
    Expenditure.findOneAndDelete({"_id": id})
        .then(expenditure => {
            res.json(expenditure)
        })
        .catch(err => {
            res.json(err)
        })
}