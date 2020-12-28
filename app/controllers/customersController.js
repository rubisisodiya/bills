const CustomerProfile = require('../models/CustomerProfile')
//const Bill = require('../models/Bill')
const customersController = {}

customersController.list = (req,res) => {
    CustomerProfile.find({})
        .then(customers => {
            res.json(customers)
        }).catch(err => res.json(err))
}

customersController.create = (req,res) => {
    const { body } = req
    const customer = new CustomerProfile(body)
    customer.save()
        .then(customer => {
            res.json(customer)
        }).catch(err => res.json(err))
}

customersController.delete = (req,res) => {
    const id = req.params.id
    CustomerProfile.findOneAndRemove({_id: id})
        .then(cus => {
            res.json(cus)
        }).catch(err => res.json(err))
}

customersController.update = (req,res) => {
    const id = req.params.id
    const { body } = req
    CustomerProfile.findOneAndUpdate({_id:id},body,{new: true})
        .then(customer => {
            res.json(customer)
        }).catch(err => res.json(err))
}

// customersController.show = (req,res) => {
//     const id = req.params.id
//     console.log(id,'------------->id')
//     CustomerProfile.findOne({_id:id})
//         .then(cus => {
//             Bill.find({customer: id},'createdAt products billId totalAmount')
//                 .then(bill => {
//                     res.json({...cus, ...bill})
//                 }).catch(err => res.json(err))
//         }).catch(err => res.json(err))
// }

module.exports = customersController