require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
mongoose.connect(process.env.CONNECTION_STRING,{ 
    useNewUrlParser:true, 
    useCreateIndex: true,
    useUnifiedTopology: true 
}).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use('/files',express.static(path.resolve(__dirname,'..','temp','uploads')));

app.use(require('./routes'));

app.listen(3000);