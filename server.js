require('dotenv').config();
// Connect to the database. Make sure this is after dotenv config. 'require' is a function.
require('./config/database');
const express = require('express');
const path = require('path'); // node module
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();
// Development port : 3001. Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
// In production, we'll have a PORT number set in the environment variables
const PORT = process.env.PORT || 3001;

//* MIDDLEWARE configured (which needs to be before all the routes)
// Logger middleware
app.use(logger('dev')); // we see info re request in terminal
// JSON payload middleware (for data coming from frontend functions); processes JSON data sent in the AJAX request and adds it to the req.body
app.use(express.json()); // built-in Express middleware; we'll still access data in req.body though
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
// Checks if token was sent and sets a user data on the request (puts user data in req.user); looks for a token
app.use(require('./config/checkToken'));

// * ALL OTHER ROUTES
// Match incoming requests.. Everything that comes in here goes to api/users.js
app.use('/api/users', require('./routes/api/users'));

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary to return the index.html on ALL non-AJAX requests
// req is request to server; the res is what's sent back to the user
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Tell the Express app to listen for incoming requests (on port 3001, so React's development server can keep using 3000).
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});