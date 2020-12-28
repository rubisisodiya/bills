const User = require('../models/User')

// IMPORTANT: move info over to user model instead of business model to avoid querying TWO models on every single request!
const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(user => {
            if(user) {
                req.user = user
                req.token = token
                next()
                
            } else {
                res.status('401').send({notice: 'token is invalid'})
            }
        })
        .catch(err => {
            res.status('401').send(err)
        })
}

// const checkAuthorisation = (req, res, next) => {
//     const activeBusiness = req.params.businessId
//     if (req.body.business && req.body.business != activeBusiness) {
//         res.status('401').send('Records cannot be moved across businesses')
//     }
//     const find = req.businesses.find(business => business._id == activeBusiness)
//     if (find) {
//         req.business = find
//         next()
//     } else {
//         res.sendStatus('401')
//     }
// }

module.exports = {
    authenticateUser
}