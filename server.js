const express = require('express');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const IP = process.env.IP;

app.listen(PORT, IP);
console.log(`Server running in ${NODE_ENV} mode on Port ${PORT} on ${IP}`);
