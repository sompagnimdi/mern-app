onst User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken
  login
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.status(200).json(req.exp);
async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can serialize a string
    res.status(200).json(token);
  } catch (e) {
    // Probably a dup email
    res.status(400).json({ msg: e.message});
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // Find the user by their email address
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    // Check if the password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.status(200).json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // send back the token as a string
    // which we need to account for
    // in the client
    res.status(200).json(token);
  } catch (e) {
    res.status(400).json(e);
  } catch(e) {
    res.status(400).json({ msg: e.message, reason: 'Bad Credentials' });
  }
}


/*-- Helper Functions --*/
/* Helper Functions */

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
