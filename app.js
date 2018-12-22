const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended: false}))



// app.set('port', 3000)

const PORT = process.env.PORT || 3000;

app.set('port', PORT);


app.listen(app.get('port'), ()=>{
    console.log(`Server listening on port ${app.get('port')}`)
})

