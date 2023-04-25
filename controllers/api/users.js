// * Request handler logic (is here, in a separate file)

// controller page to convert password to jwt.
// jwt token = string to verify user is who use says they are
// bcrypt = package to encrypt password

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function create(req, res) {
  // console.log('[From POST handler]', req.body); // <---- IMPORTANT to console, to "follow the data"
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // console.log(user); // console.log here
    // Stores information in the
    const token = createJWT(user);

    // Yes, we can use res.json to send back just a string. The client code needs to take this into consideration.
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function login(req, res) {
  try {
    // find the user in db by email
    const user = await User.findOne({ email: req.body.email });
    console.log('[USER FOUND', user);
    if (!user) {
      throw Error('User not found.');
    }
    // if user exists: compare the password to hashed password
    const matched = await bcrypt.compare(req.body.password, user.password);
    if (!matched) {
      throw Error('User not found.');
    }
    // if password is a match create a token
    const token = createJWT(user);
    // send back a new token with the user data in the payload
    res.json(token);
  } catch (error) {
    res.status(400).json({ error: 'Check credentials' });
  }
}

async function checkToken(req, res) {
  console.log(req.user);
  res.json(req.exp);
}

// Create a new jwt and specify expiration time of jwt
function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
}

module.exports = {
  create,
  login,
  checkToken,
};
