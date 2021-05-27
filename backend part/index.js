const express = require('express')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const router = require('./routes/routes')
const multer = require('multer');
const cors = require('cors')
var path = require('path');
var fs = require('fs');
const PORT = process.env.PORT || 3000
const app = express()





app.use(bodyParser.json());
app.use(cors())
app.use(router)
app.use(express.static('public'));

async function start(){
    try {
        await mongoose.connect('mongodb+srv://roman:root@booksearch.wzrak.mongodb.net/book-search', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server has been started', PORT);
        })
    }
    catch(e){
        console.log(e);
    }
}
start()