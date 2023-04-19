const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { readdirSync } = require('fs');
const { dbConnection } = require('./database/config');

const { PORT } = process.env;

// Create the express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());


// Routes
// app.use('/', require('./routes/user'));
readdirSync('./routes').map( route => app.use('/', require(`./routes/${ route }`)));

// listen request
app.listen( PORT, () => {
    console.log(`Server running on the port ${ PORT } og lykkes!`);
});



