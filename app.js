const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const config = require('./config/db')


app.use(express.json())
app.use(express.urlencoded({extended: false}))


mongoose.connect(config.db, { useNewUrlParser: true }, (err)=>{
if(err){
process.exit(1)
}else{
    console.log("connected to mongodb")
}
})

app.use('/', authRoutes)

// app.set('port', 3000)

const PORT = process.env.PORT || 3000;

app.set('port', PORT);


app.listen(app.get('port'), ()=>{
    console.log(`Server listening on port ${app.get('port')}`)
})

module.exports = app;