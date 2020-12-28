const Category = require('../models/Category')
const _ = require('lodash')

module.exports.list = (req, res) => {
    Category.find()
        .then(categories => {
            res.json(categories)
        })
}
module.exports.create = (req, res) => {
    const body = req.body
    const category = new Category(body) 
    category.save()
        .then(category => {
            res.json(category)
        }).catch(error=> res.send(error))
}
module.exports.show = (req, res) => {
    const id= req.params.id
    Category.findOne({"_id":id})
        .then(category => {
            res.json(category)
        }).catch(error=> res.send(error))
}
module.exports.update = (req, res) => {
    const id= req.params.id
    const body= req.body
    Category.findByIdAndUpdate(id,body,{new:true})
        .then(category => {
            res.json(category)
        }).catch(error=> res.send(error))
}
module.exports.delete = (req, res) => {
    const id = req.params.id
    Category.findOneAndDelete({"_id": id})
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.json(err)
        })
}