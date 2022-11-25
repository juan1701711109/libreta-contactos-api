const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

require('./database/db');

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());

dotenv.config({ path : './env/.env'});

app.use('/', require('./routes/router'));

app.listen(3000, () => {
    console.log('Server Running');
})
