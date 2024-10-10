const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

//initialize
const app = express();



//configure - middleware

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
dotenv.config();

// Middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));


var registrationRouter = require('./routes/registration-route');
var loginRouter = require('./routes/login-route');
var expenseRouter = require('./routes/expense-route');
var logoutRouter = require('./routes/logout-route');

app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', expenseRouter);
app.use('/', logoutRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


  // Start the server
app.listen(4000, function() {
  console.log('Server is running on port 4000');
});