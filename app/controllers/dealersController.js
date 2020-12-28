const DealerProfile = require('../models/DealerProfile')
const dealersController = {}

dealersController.list = (req,res) => {
    DealerProfile.find({})
        .then(dealers => {
            res.json(dealers)
        }).catch(err => res.json(err))
}

dealersController.create = (req,res) => {
    const { body } = req
    const dealer = new DealerProfile(body)
    dealer.save()
        .then(dealer => {
            res.json(dealer)
        }).catch(err => res.json(err))
}

dealersController.delete = (req,res) => {
    const id = req.params.id
    DealerProfile.findOneAndRemove({_id: id})
        .then(cus => {
            res.json(cus)
        }).catch(err => res.json(err))
}

dealersController.update = (req,res) => {
    const id = req.params.id
    const { body } = req
    DealerProfile.findOneAndUpdate({_id:id},body,{new: true})
        .then(dealer => {
            res.json(dealer)
        }).catch(err => res.json(err))
}

module.exports = dealersController