const express = require('express')
const cors = require("cors")
const path = require('path')
const setupDB  = require("./config/database")
const routes  = require("./config/routes")
var morgan = require('morgan')
setupDB()

const app = express()
const port = process.env.PORT || 3005
app.use(morgan('dev'))

app.use(express.json())
app.use(cors())
app.use("/api",routes)

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.listen(port,function(){
    console.log("Listening on port " + port)
})
