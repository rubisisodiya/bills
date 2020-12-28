const User = require('../models/User')
const _ = require('lodash')

module.exports.list = (req, res) => {
    User.find()
        .then(users => {
            res.send(users)
        })
}

module.exports.register = (req, res) => {
    const body = req.body
    // console.log('he')
    const user = new User(body) 
    user.save() 
        .then(user => {
            res.send(_.pick(user, ['_id', 'username', 'email']))
        })
        .catch(err => {
            res.send(err)
        })
}
module.exports.update= (req,res)=>{
        const id = req.user._id
        const body = req.body
        User.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'})
            .then(user => {
                res.send({success: user})
            })
            .catch(err => {
                res.send(err)
            })
}

module.exports.login = (req, res) => {
    const body = req.body
    const search = {
        password: body.password
    }
    // use validator instead, improve quality of variable names! Clean this up!
    if(search.password) {
        if (body.username && body.username.includes('@')) {
            search.email = body.username
        } else {
            body.username && (search.username = body.username)
        }
    }
    User.findByCredentials(search)
        .then(user => {
            return user.generateToken()
        })
        .then(userData => {
            res.send(userData)
        })
        .catch(err => {
            res.send(err)
        })

}

module.exports.checkLoginStatus = (req, res) => {
    // console.log(req.user)
    if (req.user) res.send(_.pick(req.user, ['username',"role"]))
}


module.exports.logout = (req, res) => {
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token:token}}})
        .then(() => {
            res.send({notice: 'successfully logged out'})
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports.logoutAll = (req, res) => {
    const {user, token} = req 
    User.findByIdAndUpdate(user._id, { $set: {tokens: []}}, {new: true})
        .then(user => {
            res.send({notice: 'succesfully logged out of all devices'})
        })
}