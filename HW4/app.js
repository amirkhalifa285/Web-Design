const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { router: userRoutes } = require('./routes/user');
const { router: preferenceRoutes } = require('./routes/preference');
const vacationRoutes = require('./routes/vacation');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/preferences', preferenceRoutes);
app.use('/vacation', vacationRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
