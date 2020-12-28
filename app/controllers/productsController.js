const Product = require('../models/Product')
const Category = require('../models/Category')
const _ = require('lodash')

module.exports.list = (req, res) => {
    Product.find().populate('category','name')
        .then(products => {
            res.json(products)
        })
}
module.exports.create = (req, res) => {
    const body = req.body
    const product = new Product(body) 
    product.save()
        .then(product => {
            res.json(product)
        }).catch(error=> res.send(error))
}
module.exports.show = (req, res) => {
    const id= req.params.id
    Product.findOne({"_id":id}).populate('category','name')
        .then(product => {
            res.json(product)
        }).catch(error=> res.send(error))
}
module.exports.update = (req, res) => {
    const id= req.params.id
    const body= req.body
    
    Product.findByIdAndUpdate(id,body,{new:true}).populate('category','name')
        .then(product => {
            // console.log(product)
            // Category.findOne({_id: product.category})
            // .then(category=>{
                // console.log(category)
            //     if(!category.products.includes(product._id)){
            //         category.products.push(product._id)
            //         category.save().then(cat=> Promise.resolve()).catch(err => console.log(err))
            //     }
            // }).catch(err=>console.log(err))
            res.json(product)
        }).catch(error=> res.send(error))
}
module.exports.delete = (req, res) => {
    const id = req.params.id
    Product.findOneAndDelete({"_id": id})
        .then(product => {
            res.json(product)
        })
        .catch(err => {
            res.json(err)
        })
}