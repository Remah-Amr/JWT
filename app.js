const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser') // we install it to ckeck if user is Auth-ed by accessing cookies 'req.cookies'
const cors = require('cors')

const app = express()

// midlleware
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))
app.use(morgan('dev'))
app.use(bodyParser.json())

// routes
app.use('/users',require('./routes/users'))

// connect mongodb
mongoose.connect('mongodb+srv://remah:remah654312@cluster0-ytypa.mongodb.net/ApiAuthentication?retryWrites=true&w=majority',
    {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log('mongodb connected')
})

app.use((error,req,res,next)=>{
    res.json({
        error : error.message
    })
    
})

// port
app.listen(9999,()=> console.log('server started successfully !'))