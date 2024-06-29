const express = require('express');
const { users } = require('./user');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const preferences = [];

router.post('/', (req, res) => {
  const { accessCode, startDate, endDate, destination, vacationType } = req.body;
  const user = users.find(u => u.accessCode === accessCode);
  if (!user) {
    return res.status(400).send({ error: 'Invalid access code' });
  }
  const existingPreference = preferences.find(p => p.username === user.username);
  if (existingPreference) {
    existingPreference.startDate = startDate;
    existingPreference.endDate = endDate;
    existingPreference.destination = destination;
    existingPreference.vacationType = vacationType;
  } else {
    preferences.push({ username: user.username, startDate, endDate, destination, vacationType });
  }
  res.send({ message: 'Preferences saved', preferences });
});

router.get('/', (req, res) => {
  res.send(preferences);
});

module.exports = { router, preferences };
