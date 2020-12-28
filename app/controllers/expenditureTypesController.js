const ExpenditureType = require('../models/ExpenditureType')
const _ = require('lodash')

module.exports.list = (req, res) => {
    ExpenditureType.find()
        .then(expenditureTypes => {
            res.json(expenditureTypes)
        })
}
module.exports.create = (req, res) => {
    const body = req.body
    const expenditureType = new ExpenditureType(body) 
    expenditureType.save()
        .then(expenditureType => {
            res.json(expenditureType)
        }).catch(error=> res.send(error))
}
module.exports.show = (req, res) => {
    const id= req.params.id
    ExpenditureType.findOne({"_id":id})
        .then(expenditureType => {
            res.json(expenditureType)
        }).catch(error=> res.send(error))
}
module.exports.update = (req, res) => {
    const id= req.params.id
    const body= req.body
    ExpenditureType.findByIdAndUpdate(id,body,{new:true})
        .then(expenditureType => {
            res.json(expenditureType)
        }).catch(error=> res.send(error))
}
module.exports.delete = (req, res) => {
    const id = req.params.id
    ExpenditureType.findOneAndDelete({"_id": id})
        .then(expenditureType => {
            res.json(expenditureType)
        })
        .catch(err => {
            res.json(err)
        })
}