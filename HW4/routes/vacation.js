const express = require('express');
const { preferences } = require('./preference');

const router = express.Router();

router.get('/', (req, res) => {
  if (preferences.length < 5) {
    return res.send({ message: 'Waiting for all preferences to be submitted' });
  }

  const destinationCount = {};
  const vacationTypeCount = {};
  preferences.forEach(p => {
    destinationCount[p.destination] = (destinationCount[p.destination] || 0) + 1;
    vacationTypeCount[p.vacationType] = (vacationTypeCount[p.vacationType] || 0) + 1;
  });

  const majorityDestination = Object.keys(destinationCount).reduce((a, b) => destinationCount[a] > destinationCount[b] ? a : b);
  const majorityVacationType = Object.keys(vacationTypeCount).reduce((a, b) => vacationTypeCount[a] > vacationTypeCount[b] ? a : b);

  const startDate = preferences.map(p => new Date(p.startDate)).reduce((a, b) => new Date(Math.max(a, b)));
  const endDate = preferences.map(p => new Date(p.endDate)).reduce((a, b) => new Date(Math.min(a, b)));

  if (startDate > endDate) {
    return res.send({ message: 'No overlapping dates found, selecting earliest submitted preference' });
  }

  res.send({
    destination: majorityDestination,
    vacationType: majorityVacationType,
    startDate,
    endDate
  });
});

module.exports = router;
