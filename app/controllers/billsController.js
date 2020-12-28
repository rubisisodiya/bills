const Bill = require('../models/Bill')
const _ = require('lodash')

module.exports.list = (req, res) => {
    Bill.find()
        .sort({createdAt: 'desc'})
        .populate('products.product products.stock customer')
        .then(bills => {
            res.json(bills)
        })
}
module.exports.create = (req, res) => {
    const body = req.body
    const bill = new Bill(body) 
    bill.save()
        .then(bill => {
            res.json(bill)
        }).catch(error=> res.send(error))
}
module.exports.show = (req, res) => {
    const id= req.params.id
    Bill.findOne({"_id":id})
        .then(bill => {
            res.json(bill)
        }).catch(error=> res.send(error))
}
module.exports.update = (req, res) => {
    const id= req.params.id
    const body= req.body
    Bill.findByIdAndUpdate(id,body,{new:true})
        .then(bill => {
            res.json(bill)
        }).catch(error=> res.send(error))
}
module.exports.delete = (req, res) => {
    const id = req.params.id
    Bill.findOneAndDelete({"_id": id})
        .then(bill => {
            res.json(bill)
        })
        .catch(err => {
            res.json(err)
        })
}