const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const users = [
  { username: process.env.USER1_USERNAME, password: process.env.USER1_PASSWORD, accessCode: null },
  { username: process.env.USER2_USERNAME, password: process.env.USER2_PASSWORD, accessCode: null },
  { username: process.env.USER3_USERNAME, password: process.env.USER3_PASSWORD, accessCode: null },
  { username: process.env.USER4_USERNAME, password: process.env.USER4_PASSWORD, accessCode: null },
  { username: process.env.USER5_USERNAME, password: process.env.USER5_PASSWORD, accessCode: null },
];

const generateAccessCode = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }
  user.accessCode = generateAccessCode();
  res.send({ message: 'Login successful', accessCode: user.accessCode });
});

module.exports = { router, users };
