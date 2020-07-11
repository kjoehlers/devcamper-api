const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

// connect to the database
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body Parser
app.use(express.json());

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// enable error handling
app.use(errorHandler);

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const IP = process.env.IP;
const MONGO_URI = process.env.MONGO_URI;

const server = app.listen(PORT, IP);
console.log(`Server running in ${NODE_ENV} mode on Port ${PORT} on ${IP}`);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server & exit
  server.close(() => process.exit(1));
});
