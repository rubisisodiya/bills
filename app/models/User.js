const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: () => {
                return 'Invalid format for email'
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [{
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    role: {
        type: String,
        enum: ['admin','dealer','employee','customer'],
        default: 'employee'
    }
})

userSchema.pre('save', function(next) {
    const user = this
    if (user.isNew) {
        encryptPassword = () => {
            return bcrypt.genSalt(10)
                .then(salt => {
                    return bcrypt.hash(user.password,salt)
                        .then(encPass => {
                            user.password = encPass
                            // user.passUpdate = false
                        })
                })
        }
        setRole = () => {
            return User.countDocuments()
                .then(count => {
                    if(count == 0){
                        user.role = "admin"
                    }
                })
        }
        return Promise.all([encryptPassword(),setRole()])
            .then(values => {
                next()
            })
            .catch(err => {
                return Promise.reject(err.message)
            })
    } else {
        next()
    }
})

userSchema.statics.findByCredentials = function(search) {
    const User = this
    return User.findOne(search.username ? {username: search.username} : {email: search.email})
        .then(user => {
            if (!user) {
                return Promise.reject({notice: 'invalid email/password'})
            } else {
                return bcrypt.compare(search.password, user.password)
                    .then(result => {
                        if (result) {
                            return Promise.resolve(user)
                        } else {
                            return Promise.reject({notice: 'invalid email/password'})
                        }
                    })
                    .catch(err => {
                        return Promise.reject(err)
                    })
            }
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByToken = function(token) {
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'expo')
    } catch(err) {
        return Promise.reject(err)
    }
    tokenData.token= token
    return User.findOne({_id: tokenData._id})
}




userSchema.methods.generateToken = function() {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username
    }

    const token = jwt.sign(tokenData, 'expo')
    user.tokens.push({token})

    return user.save()
        .then(user => {
            const userData = {
                token,
                username: user.username,
                role: user.role
            }
            return Promise.resolve(userData)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

const User = mongoose.model('User', userSchema)

module.exports = User