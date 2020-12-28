const Stock = require('../models/Stock')
const _ = require('lodash')

module.exports.list = (req, res) => {
    Stock.find()
        .populate('product')
        .then(stocks => {
            res.json(stocks)
        })
}
module.exports.create = (req, res) => {
    const body = req.body
    const stock = new Stock(body) 
    stock.save()
        .then(stock => {
            res.json(stock)
        }).catch(error=> res.send(error))
}
module.exports.show = (req, res) => {
    const id= req.params.id
    Stock.findOne({"_id":id})
        .then(stock => {
            res.json(stock)
        }).catch(error=> res.send(error))
}
module.exports.update = (req, res) => {
    const id= req.params.id
    const body= req.body
    Stock.findByIdAndUpdate(id,body,{new:true})
        .populate('product')
        .then(stock => {
            res.json(stock)
        }).catch(error=> res.send(error))
}
module.exports.delete = (req, res) => {
    const id = req.params.id
    Stock.findOneAndDelete({"product": id})
        .then(stock => {
            res.json(stock)
        })
        .catch(err => {
            res.json(err)
        })
}
module.exports.destroy = (req,res) => {
    Stock.remove().then(data =>{
        res.send([])
    }).catch(err => res.send(err))
}