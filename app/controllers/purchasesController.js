const Purchase = require('../models/Purachse')
const Product = require('../models/Product')
const Stock = require('../models/Stock')
const _ = require('lodash')

module.exports.list = (req, res) => {
    Purchase.find().populate('dealer').populate('products.product')
        .sort({createdAt: 'desc'})
        .then(purchases => {
            res.json(purchases)
        })
}
module.exports.create = async(req, res) => {
    const body = req.body

    let dataPack = await Promise.all( 
        body.products.map(async item => {
            try{
                let exist = await Product.findOne({_id: item.product})
                if(exist){
                    if(!exist.price){
                        Product.findOneAndUpdate({_id: item.product},{price: item.price})
                        .then()
                        Stock.findOneAndUpdate({product: item.product},{price: item.price})
                        .then()
                    }else{
                        Stock.findOneAndUpdate({product: item.product},{
                            $inc: { quantity: item.quantity }
                        })
                        .then()
                    }
                    return item
                }
                else{
                    let newProductId, newStockId
                    let newProduct = {
                        name: item.name,
                        category: item.category,
                        price: item.price
                    }
                    const product = new Product(newProduct)
                    let saveProduct = await product.save()
                    newProductId = saveProduct._id

                    let newStock = {
                        product: newProductId,
                        quantity: item.quantity,
                        stockPrice: item.price
                    }
                    const stock = new Stock(newStock)
                    let saveStock = await stock.save()
                    newStockId = saveStock._id

                    Product.findOneAndUpdate({_id: newProductId},{stock:newStockId})
                    .then()

                    return({
                        product: newProductId,
                        stock: newStockId,
                        price: item.price,
                        quantity: item.quantity,
                        name: item.name
                    })
                }
            }
            catch(e){
                res.json(e)
            }
        })
    )

    body.products = dataPack
    const purchase = new Purchase(body)
    purchase.save()
        .then(purchase => {
            //console.log('purchase ',purchase)
            purchase.populate('products.product').execPopulate()
                .then(populatedPurchase => {
                    console.log(populatedPurchase)
                    res.json(populatedPurchase)
                })
        }).catch(error=> res.json(error))
}

module.exports.show = (req, res) => {
    const id= req.params.id
    Purchase.findOne({"_id":id})
        .then(purchase => {
            res.json(purchase)
        }).catch(error=> res.json(error))
}
module.exports.update = (req, res) => {
    const id= req.params.id
    const body= req.body
    Purchase.findByIdAndUpdate(id,body,{new:true})
        .then(purchase => {
            res.json(purchase)
        }).catch(error=> res.json(error))
}
module.exports.delete = (req, res) => {
    const id = req.params.id
    Purchase.findOneAndDelete({"_id": id})
        .then(purchase => {
            res.json(purchase)
        })
        .catch(err => {
            res.json(err)
        })
}