const mongoose = require('mongoose')

const CONNECTION_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/billingApp`

const setupDB = () => {
    mongoose.connect(CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log('db connection error', err)
        })
}

module.exports = setupDB